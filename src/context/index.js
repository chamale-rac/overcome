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

export const OpenChat = proxy({
  isOpen: false,
  chat_id: '',
  name: '',
})

export const image = proxy({
  result: '',
  saved: false,
})

export const notifications = proxy({
  isOpen: false,
  closeFunction: null,
  unreadCount: 0,
})

export const modal = proxy({
  isOpen: false,
  closeFunction: null,
})

export const showOnDashboard = proxy({
  type: '',
  id: '',
})

export const dashStore = proxy({
  data: {
    type: '',
    id: '',
    setValues(value) {
      this.type = value.type
      this.id = value.id
    },
  },
})
