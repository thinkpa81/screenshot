import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    ssr: true,
    target: 'esnext',
    rollupOptions: {
      input: 'src/index.tsx',
      output: {
        entryFileNames: '_worker.js',
        format: 'esm'
      }
    },
    outDir: 'dist',
    minify: false
  }
})
