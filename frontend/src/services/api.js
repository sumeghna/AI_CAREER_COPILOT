// frontend/src/services/api.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('orbit_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth endpoints
export const registerUser = (userData) => api.post('/auth/register', userData)
export const loginUser = (userData) => api.post('/auth/login', userData)
export const getCurrentUser = () => api.get('/auth/me')

export default api