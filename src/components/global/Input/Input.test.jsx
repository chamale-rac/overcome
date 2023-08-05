import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import sinon from 'sinon'

import Input from './Input.jsx'

describe('Input', () => {
  it('renders an input element', () => {
    const { getByRole } = render(
      <Input
        label="Name"
        name="name"
        value="Alice"
        onChange={() => {}}
        type="text"
      />,
    )

    const input = getByRole('textbox', { name: 'Name:' })

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveValue('Alice')
  })

  it('renders a textarea element', () => {
    const { getByRole } = render(
      <Input
        label="Message"
        name="message"
        value="Hello, world!"
        onChange={() => {}}
        isTextArea
      />,
    )

    const textarea = getByRole('textbox', { name: 'Message:' })

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('rows', '4')
    expect(textarea).toHaveValue('Hello, world!')
  })

  it('displays an error message when the error prop is set', () => {
    const { getByText } = render(
      <Input
        label="Name"
        name="name"
        value=""
        onChange={() => {}}
        error="Name is required"
      />,
    )

    const error = getByText('Name is required')

    expect(error).toBeInTheDocument()
  })
})
