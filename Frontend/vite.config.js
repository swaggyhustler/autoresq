import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
      proxy: {
          '/backend': {
          target: 'http://localhost:3000',
          changeOrigin: true, // Changes the origin of the host header to the target URL
          rewrite: (path) => path.replace(/^\/backend/, ''), // Optionally remove /api prefix
        },
        '/api/security/oauth': {
          target: 'https://outpost.mappls.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api/security/oauth': '',
          },
        },
      },
    },
})
