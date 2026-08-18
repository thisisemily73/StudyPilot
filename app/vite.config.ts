import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/StudyPilot/app/',
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'],
    },
  },
})