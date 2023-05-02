import Notification from './Notification'

export default {
  title: 'Notifications/Notification',
  component: Notification,
  tags: ['autodocs'],
  args: {
    children: 'This is a notification'
  },
}

export const asDefault = {
  args: {
  },
}

export const asSuccess = {
  args: {
  },
}

export const asDanger = {
  args: {
    type: 'danger'
  },
}

export const asWarning = {
  args: {
    type: 'warning'
  },
}
