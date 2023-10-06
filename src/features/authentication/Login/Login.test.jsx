import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import Login from './Login'

describe('Login component', () => {
  it('should render the component', () => {
    const { getByText, getByLabelText } = render(<Login />)
    expect(getByText('Sign in 🔑')).toBeInTheDocument()
    expect(getByLabelText('Username:')).toBeInTheDocument()
    expect(getByLabelText('Password:')).toBeInTheDocument()
    expect(getByText('Sign in')).toBeInTheDocument()
  })

  it('should call postLogin when the form is submitted', async () => {
    const successAction = sinon.spy()
    const failAction = sinon.spy()
    const handleRequest = sinon.stub().resolves({
      status: 200,
      data: {
        id: 1,
        username: 'testuser',
        auth_token: 'testtoken',
      },
    })
    const { getByLabelText, getByText } = render(
      <Login
        successAction={successAction}
        failAction={failAction}
        handleRequest={handleRequest}
      />,
    )
    const usernameInput = getByLabelText('Username:')
    const passwordInput = getByLabelText('Password:')
    const submitButton = getByText('Sign in')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    fireEvent.click(submitButton)
  })
})
