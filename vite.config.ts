import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // يسمح بالوصول من أي IP (اختياري)
    watch: {
      usePolling: true, // يجبر Vite يراقب الملفات فعلاً
      interval: 100, // كل 100ms يفحص التغييرات
    },
    port: 5173, // ممكن تغيّره لو بتحب
  },
})
