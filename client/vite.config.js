import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://humble-bassoon-wr565rwxxxjp2g44q-5000.app.github.dev/api',
        changeOrigin: true,
        secure: false
      }
    }
  }
})