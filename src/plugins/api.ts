import axios from 'axios'
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
})

api.interceptors.request.use(config => {
  const authStore = useAuth()
  const token = authStore?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const router = useRouter()

    if (error.response?.status === 401) {
      router.push('/auth/login/')
    }
    return Promise.reject(error)
  }
)

export default api
