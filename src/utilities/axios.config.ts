import axios from 'axios'

export let ax = axios.create({
  baseURL: 'https://real-time-chat-app-iti-v2.onrender.com/api/v1',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export function resetAxiosConfig() {
  ax = axios.create({
    baseURL: 'https://real-time-chat-app-iti-v2.onrender.com/api/v1',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}
