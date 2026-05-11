#!/usr/bin/env node
/**
 * Interactive script for mapping client logos (public/clients/*.png)
 * to client entries in src/data/clients.ts.
 *
 * Usage:  node scripts/map-logos-interactive.mjs
 */

import { createReadStream, existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { createInterface } from 'readline'
import { readdirSync } from 'fs'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT   = resolve(__dir, '..')
const CLIENTS_DIR  = join(ROOT, 'public', 'clients')
const MAP_FILE     = join(ROOT, 'scripts', 'client-logo-map.json')
const CLIENTS_TS   = join(ROOT, 'src', 'data', 'clients.ts')

// ── helpers ───────────────────────────────────────────────────────────────────

function openImage(absPath) {
  const escaped = absPath.replace(/"/g, '\\"')
  let cmd
  if (process.platform === 'win32') {
    cmd = `start "" "${escaped}"`
  } else if (process.platform === 'darwin') {
    cmd = `open "${escaped}"`
  } else {
    cmd = `xdg-open "${escaped}"`
  }
  exec(cmd, (err) => {
    if (err) console.warn(`  [warn] Could not open image: ${err.message}`)
  })
}

function ask(rl, prompt) {
  return new Promise((res) => rl.question(prompt, (ans) => res(ans)))
}

function loadMap() {
  if (!existsSync(MAP_FILE)) return {}
  try {
    const raw = JSON.parse(readFileSync(MAP_FILE, 'utf8'))
    // validate — must be plain object
    if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) return raw
  } catch { /* fall through */ }
  return {}
}

function saveMap(map) {
  writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + '\n', 'utf8')
}

// ── apply map → clients.ts ─────────────────────────────────────────────────

function applyMapToClientsTs(map) {
  let source = readFileSync(CLIENTS_TS, 'utf8')
  const knownNames = new Set()

  // collect all client names from source
  for (const m of source.matchAll(/name:\s*['"]([^'"]+)['"]/g)) {
    knownNames.add(m[1])
  }

  let mapped = 0
  const unmatched = []
  const seenFiles = new Set()

  for (const [file, clientName] of Object.entries(map)) {
    if (!clientName) continue

    // find canonical name (case-insensitive)
    let canonical = null
    for (const n of knownNames) {
      if (n.toLowerCase() === clientName.toLowerCase()) { canonical = n; break }
    }
    if (!canonical) {
      unmatched.push(clientName)
      continue
    }
    if (seenFiles.has(canonical)) {
      console.warn(`  [warn] Duplicate logo mapping for "${canonical}" — using first occurrence, skipping ${file}`)
      continue
    }
    seenFiles.add(canonical)

    const logoPath = `/clients/${file}`

    // Build a regex that finds the object containing name: 'canonical'
    // then replaces the NEXT logo: null within that object.
    //
    // Strategy: split source around the name string, then patch the
    // first `logo: null` that follows it within a reasonable window.
    const nameLiteral = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(
      `(name:\\s*['"]${nameLiteral}['"][\\s\\S]{0,200}?)(logo:\\s*null)`,
    )
    const before = source
    source = source.replace(pattern, (_, prefix, _logoNull) => {
      return `${prefix}logo: '${logoPath}'`
    })
    if (source !== before) {
      mapped++
    } else {
      // already patched or something unexpected
      if (source.includes(`logo: '${logoPath}'`)) {
        mapped++ // already applied
      } else {
        unmatched.push(clientName)
      }
    }
  }

  writeFileSync(CLIENTS_TS, source, 'utf8')

  const skipped = Object.values(map).filter((v) => v === null).length
  const total   = Object.keys(map).length

  console.log()
  console.log('─────────────────────────────────')
  console.log(`  Mapped:    ${mapped} client(s) to logo file(s)`)
  console.log(`  Skipped:   ${skipped} file(s) (no client identified)`)
  if (unmatched.length) {
    console.log(`  Unmatched: ${unmatched.length} name(s) typed but not found in clients.ts:`)
    for (const u of unmatched) console.log(`               "${u}"`)
  }
  console.log('─────────────────────────────────')
  console.log()
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const pngs = readdirSync(CLIENTS_DIR)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort()

  const total = pngs.length

  // load or initialise map
  let map = loadMap()

  // resume prompt
  const hasEntries = Object.keys(map).length > 0
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  let resumeFromNull = false
  if (hasEntries) {
    const ans = (await ask(rl, 'Existing map found. Resume from last unmapped? [Y/n] ')).trim().toLowerCase()
    resumeFromNull = ans !== 'n'
    if (!resumeFromNull) {
      map = {}
      console.log('  Starting fresh.\n')
    } else {
      console.log('  Resuming — will skip files already mapped/skipped.\n')
    }
  }

  let i = 0

  while (i < pngs.length) {
    const file = pngs[i]

    // skip already-decided entries when resuming
    if (resumeFromNull && Object.prototype.hasOwnProperty.call(map, file)) {
      i++
      continue
    }

    const absPath = join(CLIENTS_DIR, file)
    openImage(absPath)
    process.stdout.write(`\n[ ${String(i + 1).padStart(2)} / ${total} ] public/clients/${file}\n`)

    const answer = (await ask(
      rl,
      "  Client name (or 'skip' / empty to leave null, 'undo' to redo previous, 'quit' to save & exit): ",
    )).trim()

    if (answer.toLowerCase() === 'quit') {
      map[file] = map[file] ?? null // don't overwrite if re-visiting
      break
    }

    if (answer.toLowerCase() === 'undo') {
      if (i === 0) {
        console.log('  Nothing to undo.')
        continue // don't advance i
      }
      i--
      // remove the previous decision so it gets re-prompted
      delete map[pngs[i]]
      continue
    }

    if (answer.toLowerCase() === 'skip' || answer === '') {
      map[file] = null
    } else {
      map[file] = answer
    }

    // autosave after every entry
    saveMap(map)
    i++
  }

  rl.close()

  // fill any remaining files not visited as null
  for (const f of pngs) {
    if (!Object.prototype.hasOwnProperty.call(map, f)) {
      map[f] = null
    }
  }

  saveMap(map)
  console.log(`\n  Map saved to scripts/client-logo-map.json`)

  applyMapToClientsTs(map)
  console.log(`  src/data/clients.ts updated.\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
