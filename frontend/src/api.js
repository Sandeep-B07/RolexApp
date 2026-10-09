import axios from 'axios'

// Vite dev server proxies /api -> http://localhost:8080
// (see vite.config.js), so a relative base URL works in dev.
const api = axios.create({
  baseURL: '/api',
  timeout: 15000
})

export default api
