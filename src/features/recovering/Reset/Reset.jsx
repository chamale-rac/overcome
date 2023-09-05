// Description: Register component
// Author: Samuel Chamalé
// Created at: 04-09-2023

import React, { useRef, useState, useEffect } from 'react'
// I will use custom icons for this project: check, times, and circle
import { Toaster, toast } from 'sonner'
import * as styles from './Reset.module.css'

import {
  Input,
  ToggleView,
  Button,
  Notification,
  Step,
} from '@components/global'

import { useApi, useForm } from '@hooks'

import { loginSchema } from '@schemas'
import { recoverSchema, verifySchema, resetSchema } from '@schemas'

import { authStore } from '@context'

const Reset = ({ customStyles, successAction, failAction }) => {
  const recoverForm = useForm(
    recoverSchema.joi,
    recoverSchema.initialValues,
    recoverSchema.initialErrorMessages,
    recoverSchema.initialErrorPrompts,
  )
  const verifyForm = useForm(
    verifySchema.joi,
    verifySchema.initialValues,
    verifySchema.initialErrorMessages,
    verifySchema.initialErrorPrompts,
  )
  const resetForm = useForm(
    resetSchema.joi,
    resetSchema.initialValues,
    resetSchema.initialErrorMessages,
    resetSchema.initialErrorPrompts,
  )
  const [recoverStep, setRecoverStep] = useState(false)
  const [verifyStep, setVerifyStep] = useState(false)
  const [resetStep, setResetStep] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingRecoverForm, setLoadingRecoverForm] = useState(false)
  const [loadingVerifyForm, setLoadingVerifyForm] = useState(false)
  const [loadingResetForm, setLoadingResetForm] = useState(false)
  const [handleError, setHandleError] = useState()

  const { handleRequest } = useApi()
  const [showPassword, setShowPassword] = useState([false, false])
  const form = useForm(
    loginSchema.joi,
    loginSchema.initialValues,
    loginSchema.initialErrorMessages,
    loginSchema.initialErrorPrompts,
  )

  const postVerify = async (code, email) => {
    setLoadingVerifyForm(true)
    const response = await handleRequest(
      'post',
      '/recover/useCode',
      {
        email,
        unique_code: code,
      },
      {},
      true,
    )
    if (response) {
      if (response.status !== 500) {
        if (response.data.match) {
          setVerifyStep(true)
          toast.custom((t) => (
            <div className={styles.toast}>
              ✅ Código verificado, ahora puedes cambiar tu contraseña.
            </div>
          ))
        } else {
          toast.custom((t) => (
            <div className={styles.toast}>
              ❌ Código no valido, intenta de nuevo.
            </div>
          ))
        }
      } else {
        toast.custom((t) => (
          <div className={styles.toast}>
            ❌ Código no valido, intenta de nuevo.
          </div>
        ))
      }
      console.log('VERIFY', response)
    }
    setLoadingVerifyForm(false)
  }

  const postRecover = async (email) => {
    setLoadingRecoverForm(true)
    const response = await handleRequest(
      'post',
      '/recover/recover',
      {
        email,
      },
      {},
      true,
    )
    if (response) {
      toast.custom((t) => (
        <div className={styles.toast}>
          ⚠️ Si el correo es valido recibiras un código de verificacion.
        </div>
      ))
      console.log('RECOVER', response)
    }
    setRecoverStep(true)
    setLoadingRecoverForm(false)
  }

  const postReset = async (code, email, password) => {
    setLoadingResetForm(true)
    const response = await handleRequest(
      'post',
      '/recover/reset',
      {
        email,
        unique_code: code,
        password,
      },
      {},
      true,
    )
    if (response) {
      if (response.status === 200) {
        toast.custom((t) => (
          <div className={styles.toast}>
            ✅ La contraseña fúe cambiada correctamente.
          </div>
        ))
        setResetStep(true)
      } else {
        toast.custom((t) => (
          <div className={styles.toast}>
            ❌ Hubo un error al cambiar contraseña.
          </div>
        ))
      }
      console.log('RESET', response)
    }
    setLoadingResetForm(false)
  }

  const handleRecover = () => {
    /* console.log('handle register')*/
    if (!recoverForm.error) {
      postRecover(recoverForm.values.email)
    }
  }

  const handleVerify = () => {
    /* console.log('handle register')*/
    if (!recoverForm.error) {
      postVerify(verifyForm.values.code, recoverForm.values.email)
    }
  }

  const handleReset = () => {
    if (!recoverForm.error && !resetForm.error) {
      postReset(
        verifyForm.values.code,
        recoverForm.values.email,
        resetForm.values.password,
      )
    }
  }

  return (
    /*TODO check for correct xl:w */
    <div
      className={`${styles.container} rounded-md xl:w-1/5 w-4/5 m-6 ${customStyles}`}
    >
      <h1 className={`${styles.title} font-bebas-neue text-[4rem] mb-0`}>
        Recover 🙊
      </h1>
      <Step
        stepNum={1}
        title={'¡Obtener código!'}
        isDone={recoverStep}
        customStyles="mt-0"
      >
        <Input
          value={recoverForm.values.email}
          onChange={recoverForm.onChange('email')}
          name="email"
          label="Email"
          type="text"
          error={recoverForm.errorMessages.email}
          required
          containerCustomStyles="mb-1"
        />
        <Button
          type="primary"
          onClick={handleRecover}
          // TODO: disable 2 minutes
          disabled={
            recoverForm.error ||
            recoverForm.values.email === '' ||
            loadingRecoverForm
          }
          loading={loadingRecoverForm}
          customStyles="mt-0 text-sm"
        >
          Enviar código
        </Button>
      </Step>
      <Toaster position="bottom-right" />
      {/* 
      <button
        onClick={() =>
          toast.custom((t) => (
            <div className={styles.toast}>
              ⚠️ Si el correo es valido recibiras un código de verificacion.
            </div>
          ))
        }
      >
        Give me a toast
      </button> */}
      <Step
        stepNum={2}
        title={'Verificar código:'}
        isDone={verifyStep}
        customStyles="mt-6"
      >
        <Input
          value={verifyForm.values.code}
          onChange={verifyForm.onChange('code')}
          name="code"
          label="Código"
          type="text"
          error={''}
          required
          containerCustomStyles="mb-1"
        />
        <Button
          type="primary"
          onClick={handleVerify}
          disabled={
            verifyForm.values.code === '' ||
            loadingVerifyForm ||
            recoverForm.error ||
            recoverForm.values.email === ''
          }
          loading={loadingVerifyForm}
          customStyles="mt-0 text-sm"
        >
          Verificar código
        </Button>
      </Step>
      <Step
        stepNum={3}
        title={'Nueva contraseña:'}
        isDone={resetStep}
        opacity={false}
        customStyles="mt-6"
      >
        <aside>
          <Input
            value={resetForm.values.password}
            onChange={resetForm.onChange('password')}
            name="password"
            placeholder=""
            label="Password"
            type={showPassword[0] ? 'text' : 'password'}
            required
            error={resetForm.errorMessages.password}
          />
          {resetForm.values.password && (
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
            value={resetForm.values.password2}
            onChange={resetForm.onChange('password2')}
            name="password2"
            placeholder=""
            label="Password Again"
            type={showPassword[1] ? 'text' : 'password'}
            required
            error={
              resetForm.values.password !== resetForm.values.password2 &&
              resetForm.values.password2 !== ''
                ? 'Passwords do not match'
                : null
            }
            containerCustomStyles="mb-1"
          />

          {resetForm.values.password2 && (
            <ToggleView
              open={showPassword[1]}
              onToggle={(newShowPassword) =>
                setShowPassword([showPassword[0], newShowPassword])
              }
            />
          )}
        </aside>
        {!resetStep && (
          <Button
            type="primary"
            onClick={handleReset}
            disabled={
              resetForm.error ||
              resetForm.values.password !== resetForm.values.password2 ||
              resetForm.values.password === '' ||
              resetForm.values.password2 === '' ||
              loadingResetForm ||
              verifyForm.values.code === '' ||
              recoverForm.error ||
              recoverForm.values.email === '' ||
              !verifyStep
            }
            loading={loadingResetForm}
            customStyles="mt-0  text-sm"
          >
            Cambiar contraseña
          </Button>
        )}
        {resetStep && (
          <Notification type="" customStyles="mb-3 mt-3">
            <Button customStyles="mb-1" type="primary" onClick={successAction}>
              Let's go! 🚀
            </Button>
          </Notification>
        )}
      </Step>
    </div>
  )
}

export default Reset
