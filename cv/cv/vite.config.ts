import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/cv/",           // ✅ BẮT BUỘC cho GitHub Pages thư mục con
  plugins: [react()],
})
