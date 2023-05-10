import axios from 'axios'
import { SERVER_BASE_URL } from '@utils/constants'

export default axios.create({
  baseURL: SERVER_BASE_URL,
})

// Attaching jwt token to every request
// Interceptors, to refresh token based on denied token
export const axiosPrivate = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
