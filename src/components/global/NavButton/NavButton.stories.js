import NavButton from './NavButton'

export default {
  title: 'Buttons/NavButton',
  component: NavButton,
  tags: ['autodocs'],
  args: {
    children: 'This is a button',
  },
}
export const isNormal = {
  args: {
    type: 'normal',
  },
}

export const isLink = {
  args: {
    type: 'link',
  },
}
