import Eye from './Eye'

export default {
  title: 'Inputs/Eye',
  component: Eye,
  tags: ['autodocs'],
  argTypes: {
  },
}

export const asOpen = {
  args: {
    open: true
  }
}

export const asClosed = {
  args: {
    open: false
  }
}
