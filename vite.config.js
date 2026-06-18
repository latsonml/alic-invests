import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: 'alic-income-fund.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
