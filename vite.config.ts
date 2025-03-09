import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
    build:{
        lib: {
            entry: ['src/copyToClipboard.ts'],
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            name:'CopyToClipboard'
        },
    },
    test: {
        environment:"happy-dom"
      }
})