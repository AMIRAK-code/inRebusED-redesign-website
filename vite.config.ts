import { defineConfig, type ServerOptions, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

const devServer = { historyApiFallback: true } as unknown as ServerOptions

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk: Buffer) => { data += chunk.toString() })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function logoMapPlugin(): Plugin {
  return {
    name: 'logo-map-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(
        '/__debug/apply-logo-map',
        async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }

          const body = await readBody(req)
          const logoMap: Record<string, string | null> = JSON.parse(body)

          // Write to scripts/client-logo-map.json (numeric keys without .png)
          const jsonPath = path.resolve('scripts/client-logo-map.json')
          const jsonOut: Record<string, string | null> = {}
          for (const [file, name] of Object.entries(logoMap)) {
            const key = file.replace('.png', '')
            jsonOut[key] = name
          }
          fs.writeFileSync(jsonPath, JSON.stringify(jsonOut, null, 2) + '\n')

          // Patch src/data/clients.ts
          const tsPath = path.resolve('src/data/clients.ts')
          let src = fs.readFileSync(tsPath, 'utf-8')

          let mapped = 0
          let skipped = 0
          let unmatched = 0

          for (const [file, name] of Object.entries(logoMap)) {
            if (!name) { skipped++; continue }
            const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            // Match within a single object literal (no cross-object matching)
            const pattern = new RegExp(
              `(\\{[^}]*name:\\s*['"]${escapedName}['"][^}]*?)logo:\\s*null`,
            )
            const logoVal = `/clients/${file}`
            if (pattern.test(src)) {
              src = src.replace(pattern, `$1logo: '${logoVal}'`)
              mapped++
            } else {
              unmatched++
            }
          }

          fs.writeFileSync(tsPath, src)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ mapped, skipped, unmatched }))
        },
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), logoMapPlugin()],
  server: devServer,
  preview: {},
})
