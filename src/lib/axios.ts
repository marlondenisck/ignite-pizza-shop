import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 3000)))

    return config
  })
}
if (env.MODE === 'development') {
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )
}
