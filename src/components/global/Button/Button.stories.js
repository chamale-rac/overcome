import Button from './Button'

export default {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'This is a button'
  },
}

export const asPrimary = {
  args: {
    type: 'primary'
  }
}

export const asSecondary = {
  args: {
    type: 'secondary'
  }
}

export const asLoading = {
  args: {
    type: 'primary',
    loading: true,
  }
}

export const asDisabled = {
  args: {
    type: 'primary',
    disabled: true
  }
}