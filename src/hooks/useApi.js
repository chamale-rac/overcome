import axios from 'axios'
import { useState } from 'react'
import { SERVER_BASE_URL } from '@utils/constants'

const useApi = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRequest = async (
    method,
    path,
    body = {},
    headers = {},
    withCredentials,
  ) => {
    const options = {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      withCredentials,
    }

    if (method !== 'GET') {
      options.data = body
    }

    setLoading(true)

    let response

    try {
      const axiosResponse = await axios(`${SERVER_BASE_URL}${path}`, options)

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
    return response
  }

  return {
    loading,
    handleRequest,
    data,
  }
}

export default useApi
