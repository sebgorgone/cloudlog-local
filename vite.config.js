import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'nojekyll',
      closeBundle() {
        const outDir = resolve(__dirname, 'docs')
        writeFileSync(`${outDir}/.nojekyll`, '')
        console.log('✅ Added .nojekyll to docs/')
      },
    },
  ],
  build: {
    outDir: 'docs', 
  },
  base: '/cloudlog-local/'
})
