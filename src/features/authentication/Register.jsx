// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'
// I will use custom icons for this project: check, times, and circle

import * as styles from './Register.module.css'

import { Input, ToggleView, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { registerSchema } from '@schemas'

const Register = () => {
  const { loading, handleRequest } = useApi()
  const [showPassword, setShowPassword] = useState([false, false])
  const form = useForm(
    registerSchema.joi,
    registerSchema.initialValues,
    registerSchema.initialErrorMessages,
    registerSchema.initialErrorPrompts,
  )

  const postRegister = async (username, password) => {
    /*HANDLE REQUEST */
    alert('handle request')
  }

  const handleRegister = () => {
    console.log('handle register')
    if (form.validate()) {
      postRegister(form.values.username, form.values.password)
    }
  }

  return (
    <div className={`${styles.container} rounded-md xl:w-1/5 m-6`}>
      <h1 className="font-bebas-neue text-[4rem]">Sign Up</h1>
      <div>
        <Input
          value={form.values.username}
          onChange={form.onChange('username')}
          name="username"
          label="Username"
          type="text"
          required
        />
        {form.errorMessages.username}
        <aside>
          <Input
            value={form.values.password}
            onChange={form.onChange('password')}
            name="password"
            placeholder=""
            label="Password"
            type={showPassword[0] ? 'text' : 'password'}
            required
          />
          <ToggleView
            open={showPassword[0]}
            onToggle={(newShowPassword) =>
              setShowPassword([newShowPassword, showPassword[1]])
            }
          />

          {form.errorMessages.password}
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
          />
          <ToggleView
            open={showPassword[1]}
            onToggle={(newShowPassword) =>
              setShowPassword([showPassword[0], newShowPassword])
            }
          />
        </aside>

        {form.error ? (
          <Notification type="danger">{form.error}</Notification>
        ) : null}

        {form.values.password !== form.values.password2 &&
        form.values.password2 !== '' ? (
          <Notification type="warning" dismissable>
            Passwords do not match
          </Notification>
        ) : null}

        <Button
          type="primary"
          onClick={handleRegister}
          disabled={
            !form.values.username ||
            !form.values.password ||
            !form.values.password2
          }
          loading={loading}
        >
          Registrarme
        </Button>
      </div>
    </div>
  )
}

export default Register
