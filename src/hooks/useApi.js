import axios, { axiosPrivate } from 'axios'
import useRefreshToken from './useRefreshToken'

import { authStore } from '@context'

import { useState } from 'react'
import { SERVER_BASE_URL } from '@utils/constants'

const useApi = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const refresh = useRefreshToken()
  const { auth } = authStore()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axios(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  const handleRequest = async (
    method,
    path,
    body = {},
    headers = {},
    withCredentials = false,
  ) => {
    const options = {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }

    if (method !== 'GET') {
      options.data = body
    }

    setLoading(true)

    let response

    try {
      const axiosInstance = withCredentials ? axiosPrivate : axios

      const axiosResponse = await axiosInstance(
        `${SERVER_BASE_URL}${path}`,
        options,
      )

      response = {
        status: axiosResponse.status,
        data: axiosResponse.data,
      }
    } catch (e) {
      console.error('Error in api call', e)
      response = {
        status: 500,
        data: {
          error: true,
          message: e.message,
        },
      }
    }

    setLoading(false)
    setData(response.data)
    return response
  }

  return {
    loading,
    handleRequest,
    data,
  }
}

export default useApi
