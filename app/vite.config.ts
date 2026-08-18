import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/StudyPilot/app/',

  plugins: [react()],
  
  server: {
    fs: {
      allow: ['..'],
    },
  },

  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
})