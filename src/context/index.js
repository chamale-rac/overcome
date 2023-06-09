import { proxy } from 'valtio'

export const landing = proxy({
  intro: true,
})

export const authStore = proxy({
  auth: {
    isAuthenticated: false,
    user: null,
    authToken: null,
    setAuth(value) {
      this.isAuthenticated = value.isAuthenticated
      this.authToken = value.authToken
      this.user = value.user
    },
  },
})
