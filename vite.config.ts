import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Windicss from 'vite-plugin-windicss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Windicss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
