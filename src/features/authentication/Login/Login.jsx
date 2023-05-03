// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'
// I will use custom icons for this project: check, times, and circle

import * as styles from './Login.module.css'

import { Input, ToggleView, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { loginSchema } from '@schemas'

const Login = ({ customStyles, successAction, failAction }) => {
  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState()
  const { handleRequest } = useApi()
  const [showPassword, setShowPassword] = useState([false, false])
  const form = useForm(
    loginSchema.joi,
    loginSchema.initialValues,
    loginSchema.initialErrorMessages,
    loginSchema.initialErrorPrompts,
  )

  const postLogin = async (username, password) => {
    /*HANDLE REQUEST */
    alert('handle request')
    successAction()
  }

  const handleLogin = () => {
    console.log('handle register')
    if (!form.error) {
      postLogin(form.values.username, form.values.password)
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

        {handleError ? (
          <Notification type="danger" customStyles="mb-3">
            {handleError}
          </Notification>
        ) : null}

        <Button
          type="primary"
          onClick={handleLogin}
          disabled={
            form.error ||
            form.values.password === '' ||
            form.values.username === '' ||
            loading
          }
          loading={loading}
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}

export default Login
