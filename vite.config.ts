import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleApiRequest } from './server/api.ts'
import { applyRedirect } from './server/redirectsApi.ts'

/** Serves the backend API and server redirects from the Vite dev and preview servers. */
async function eon8Middleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  try {
    if (await handleApiRequest(req, res)) return
    const url = new URL(req.url || '/', 'http://localhost')
    if (await applyRedirect(req, res, url)) return
  } catch {
    // Malformed URLs fall through to Vite.
  }
  next()
}

function eon8BackendPlugin(): Plugin {
  return {
    name: 'eon8-backend',
    configureServer(server) {
      server.middlewares.use((req, res, next) => void eon8Middleware(req, res, next))
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => void eon8Middleware(req, res, next))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    eon8BackendPlugin(),
    react(),
    tailwindcss(),
  ],
  server: {
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-motion'
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide'
            }
            return 'vendor-libs'
          }
        },
      },
    },
  },
})
