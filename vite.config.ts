import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { handleCmsApiRequest } from './server/cmsApi.ts'
import { handleLeadsApiRequest } from './server/leadsApi.ts'

function eon8CmsApiPlugin(): Plugin {
  return {
    name: 'eon8-blog-cms-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (await handleCmsApiRequest(req, res)) return
        if (await handleLeadsApiRequest(req, res)) return
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (await handleCmsApiRequest(req, res)) return
        if (await handleLeadsApiRequest(req, res)) return
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    eon8CmsApiPlugin(),
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
