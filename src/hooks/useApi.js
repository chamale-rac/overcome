import { useState } from 'react'

const apiUrl = 'http://127.0.0.1:3000'

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
    console.log(path)
    const options = {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      credentials: withCredentials ? 'include' : 'omit',
    }

    if (method !== 'GET') {
      options.body = JSON.stringify(body)
    }

    setLoading(true)

    let response

    try {
      console.info('API CALL', method, path)
      console.info('url', `${apiUrl}${path}`)
      const fetchResponse = await fetch(`${apiUrl}${path}`, options)
      const jsonResponse = await fetchResponse.json()

      console.info('API RESPONSE', jsonResponse)

      response = {
        status: fetchResponse.status,
        data: jsonResponse,
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
