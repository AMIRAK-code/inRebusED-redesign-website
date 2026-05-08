import { defineConfig, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'

const devServer = { historyApiFallback: true } as unknown as ServerOptions

export default defineConfig({
  plugins: [react()],
  server: devServer,
  preview: {},
})
