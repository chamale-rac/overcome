import { proxy } from 'valtio'

export const landing = proxy({
  intro: true,
})

export const session = proxy({
  color: '#EFBD48',
})

export const theme = proxy({
  backgroundColor: '#f8f6dd',
})
