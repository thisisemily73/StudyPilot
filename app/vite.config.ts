import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'app',

  base: '/StudyPilot/app/',

  plugins: [react()],

  server: {
    fs: {
      allow: ['..'],
    },
  },
})