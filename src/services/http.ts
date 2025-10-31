import axios from 'axios'
import { env } from '../config/env'

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  // Place to inject auth headers in the future
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status ?? 0
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Ocurrió un error al comunicarse con el servidor'
    return Promise.reject({ status, message })
  },
)


