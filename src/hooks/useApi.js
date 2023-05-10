import axios from '@api/axios'
import { useState } from 'react'
import { SERVER_BASE_URL } from '@utils/constants'
import useAxiosPrivate from '@hooks/useAxiosPrivate'

const useApi = () => {
  // I need to check if it need just one declaration or if is need a new each time.
  const axiosPrivate = useAxiosPrivate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRequest = async (
    method,
    path,
    body = {},
    headers = {},
    withCredentials = false,
    isPrivate = false,
  ) => {
    console.log(path)
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
      console.info('API CALL', method, path)
      console.info('url', `${SERVER_BASE_URL}${path}`)

      const axiosInstance = isPrivate ? axiosPrivate : axios

      const axiosResponse = await axiosInstance(
        `${SERVER_BASE_URL}${path}`,
        options,
      )

      console.info('API RESPONSE', axiosResponse)

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
