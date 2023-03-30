import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    //add proxies to routes that must match same-origin policy
    proxy: {
      '/quiz_questions': {
        target: 'http://localhost:8080/quiz_questions',
        changeOrigin: true,
      },
      '/post': {
        target: 'http://localhost:8080/post',
        changeOrigin: true,
      },
      '/put': {
        target: 'http://localhost:8080/put',
        changeOrigin: true,
      },
      '/img': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
      },
    }
  }
})
