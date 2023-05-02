import ToggleView from './ToggleView'

export default {
  title: 'Inputs/ToggleView',
  component: ToggleView,
  tags: ['autodocs'],
  argTypes: {},
}

export const asOpen = {
  args: {
    open: true,
  },
}

export const asClosed = {
  args: {
    open: false,
  },
}
