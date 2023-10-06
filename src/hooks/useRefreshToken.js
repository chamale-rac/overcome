import axios from '@api/axios'
import { authStore } from '@context'

const useRefreshToken = () => {
  const { auth } = authStore
  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
      })
      auth.setAuth((prev) => {
        /* console.log('prev', prev)*/
        /* console.log('response', response.data.accessToken)*/
        return { ...prev, authToken: response.data.accessToken }
      })
      /* console.log('response', response.data.accessToken)*/
      return response.data.accessToken
    } catch (error) {
      // Handle errors here
    }
  }
  return refresh
}

export default useRefreshToken
