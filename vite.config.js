import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/e-commerce-project/',
  plugins: [react()],
  server: {
    // Remove the proxy configuration completely
    // or keep it empty if you need the server object for other settings
  }
})