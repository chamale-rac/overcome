import Input from './Input'

export default {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
}

export const asText = {
  args: {
    label: 'Nombre de Usuario',
    name: 'username',
    value: '',
    onChange: () => {},
    type: 'text',
    required: true,
    placeholder: 'Chama',
  },
}

export const asPassword = {
  args: {
    label: 'Password',
    name: 'password',
    value: '',
    onChange: () => {},
    type: 'password',
    required: true,
    placeholder: '',
  },
}

export const asNumber = {
  args: {
    label: 'Numero de carnet',
    name: 'carnet',
    value: '',
    onChange: () => {},
    type: 'number',
    required: true,
    placeholder: '',
  },
}
