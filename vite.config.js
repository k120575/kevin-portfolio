// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 引入 Tailwind 插件

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 將它加入插件陣列中
  ],
  base: '/',
})