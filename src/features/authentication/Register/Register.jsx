// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'
// I will use custom icons for this project: check, times, and circle

import * as styles from './Register.module.css'

import { Input, ToggleView, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { registerSchema } from '@schemas'

const Register = ({ customStyles, successAction, failAction }) => {
  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState()
  const [handleSuccess, setHandleSuccess] = useState()
  const { handleRequest } = useApi()
  const [showPassword, setShowPassword] = useState([false, false])
  const form = useForm(
    registerSchema.joi,
    registerSchema.initialValues,
    registerSchema.initialErrorMessages,
    registerSchema.initialErrorPrompts,
  )

  const postRegister = async (username, email, name, lastname, password) => {
    setLoading(true)

    const response = await handleRequest(
      'post',
      '/register',
      {
        username,
        name,
        lastname,
        email,
        password,
      },
      {},
      true,
    )

    if (response) {
      console.log(response.status)
      if (response.status === 201) {
        console.log('response', response)
        setLoading(false)
        setHandleError(null)
        setHandleSuccess('User created successfully!')
      } else if (response.status === 409) {
        setLoading(false)
        setHandleSuccess(null)
        setHandleError('This username is already in use')
      } else if (response.status === 400) {
        setLoading(false)
        setHandleSuccess(null)
        setHandleError('Username and password are required')
      } else if (response.status === 500) {
        setLoading(false)
        setHandleSuccess(null)
        setHandleError('Server error, try later')
      }
    } else {
      setLoading(false)
      setHandleSuccess(null)
      setHandleError('Something went wrong')
    }
  }

  const handleRegister = () => {
    console.log('handle register')
    if (!form.error) {
      postRegister(
        form.values.username,
        form.values.email,
        form.values.name,
        form.values.last_name,
        form.values.password,
      )
    }
  }

  return (
    /*TODO check for correct xl:w */
    <div
      className={`${styles.container} rounded-md xl:w-1/5 w-4/5 m-6 ${customStyles}`}
    >
      <h1 className={`${styles.title} font-bebas-neue text-[4rem]`}>
        Sign up 📋
      </h1>
      <div>
        <Input
          value={form.values.username}
          onChange={form.onChange('username')}
          name="username"
          label="Username"
          type="text"
          error={form.errorMessages.username}
          required
        />
        <Input
          value={form.values.email}
          onChange={form.onChange('email')}
          name="email"
          label="Email"
          type="email"
          error={form.errorMessages.email}
          required
        />
        <Input
          value={form.values.name}
          onChange={form.onChange('name')}
          name="name"
          label="Name"
          type="text"
          error={form.errorMessages.name}
          required
        />
        <Input
          value={form.values.last_name}
          onChange={form.onChange('last_name')}
          name="last_name"
          label="Last name"
          type="text"
          error={form.errorMessages.last_name}
          required
        />
        <aside>
          <Input
            value={form.values.password}
            onChange={form.onChange('password')}
            name="password"
            placeholder=""
            label="Password"
            type={showPassword[0] ? 'text' : 'password'}
            required
            error={form.errorMessages.password}
          />
          {form.values.password && (
            <ToggleView
              open={showPassword[0]}
              onToggle={(newShowPassword) =>
                setShowPassword([newShowPassword, showPassword[1]])
              }
            />
          )}
        </aside>
        <aside>
          <Input
            value={form.values.password2}
            onChange={form.onChange('password2')}
            name="password2"
            placeholder=""
            label="Password Again"
            type={showPassword[1] ? 'text' : 'password'}
            required
            error={
              form.values.password !== form.values.password2 &&
              form.values.password2 !== ''
                ? 'Passwords do not match'
                : null
            }
          />

          {form.values.password2 && (
            <ToggleView
              open={showPassword[1]}
              onToggle={(newShowPassword) =>
                setShowPassword([showPassword[0], newShowPassword])
              }
            />
          )}
        </aside>

        {handleError ? (
          <Notification type="danger" customStyles="mb-3">
            {handleError}
          </Notification>
        ) : null}

        {
          /*
          Consider change button style
           */
          handleSuccess ? (
            <Notification type="" customStyles="mb-3">
              <p className="mb-1 p-1">{handleSuccess}</p>
              <Button
                customStyles="mb-1"
                type="primary"
                onClick={successAction}
              >
                Let's go! 🚀
              </Button>
            </Notification>
          ) : null
        }

        {!handleSuccess ? (
          <Button
            type="primary"
            onClick={handleRegister}
            disabled={
              form.error ||
              form.values.password !== form.values.password2 ||
              form.values.password === '' ||
              form.values.password2 === '' ||
              form.values.username === '' ||
              form.values.email === '' ||
              form.values.name === '' ||
              form.values.last_name === '' ||
              loading
            }
            loading={loading}
          >
            Sign up
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default Register
