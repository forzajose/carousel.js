import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`,
    }
  }
})