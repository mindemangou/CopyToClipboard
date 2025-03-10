import { defineConfig } from 'vite'

export default defineConfig({
    build:{
        lib: {
            entry: ['src/copyToClipboard.ts'],
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            name:'CopyToClipboard'
        }
    },
    test: {
        environment:"happy-dom"
      }
})