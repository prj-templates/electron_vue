import { defineConfig } from 'electron-vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { builtinModules } from 'node:module'

const rootDir = resolve(__dirname)

export default defineConfig({
  main: {
    plugins: [],
    build: {
      rollupOptions: {
        external: [
          'electron',
          ...builtinModules
        ]
      },
      outDir: 'dist-electron',
      lib: {
        entry: resolve(__dirname, 'electron/main.ts'),
        formats: ['cjs'],
        fileName: 'main'
      }
    }
  },
  preload: {
    plugins: [],
    build: {
      rollupOptions: {
        external: [
          'electron',
          ...builtinModules
        ]
      },
      outDir: 'dist-electron',
      lib: {
        entry: resolve(__dirname, 'electron/preload/index.ts'),
        formats: ['cjs'],
        fileName: 'index'
      }
    }
  },
  renderer: {
    root: rootDir,
    plugins: [vue()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: resolve(rootDir, 'index.html')
      }
    }
  }
})