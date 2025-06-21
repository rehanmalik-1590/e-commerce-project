import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/e-commerce-project/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-bootstrap']
    }
  },
  optimizeDeps: {
    include: ['react-bootstrap']
  }
})