import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import AIPicker from './AIPicker.jsx'

describe('AIPicker component', () => {
  it('Renders correctly', () => {
    render(<AIPicker />)
  })

  it('Has a textarea for input', () => {
    const { getByRole } = render(<AIPicker />)
    const textarea = getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('Has a button to submit the input', () => {
    const { getByRole } = render(<AIPicker />)
    const button = getByRole('button', { name: 'Ask! ✨' })
    expect(button).toBeInTheDocument()
  })

  it('Calls the handleSubmit function when the button is clicked', () => {
    const handleSubmit = sinon.spy()
    const { getByRole } = render(<AIPicker handleSubmit={handleSubmit} />)
    const button = getByRole('button', { name: 'Ask! ✨' })

    fireEvent.click(button)

    expect(handleSubmit.calledOnce).toBe(true)
  })
})
