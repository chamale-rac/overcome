import React, { useRef, useState, useEffect } from 'react'

import * as styles from './EditProfile.module.css'

import { Input, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { profileSchema } from '@schemas'

import { authStore } from '@context'

const EditProfile = ({ user, successAction }) => {

    const [loading, setLoading] = useState(false)
    const [handleError, setHandleError] = useState()
    const [handleSuccess, setHandleSuccess] = useState()
    const { handleRequest } = useApi()
    const form = useForm(
        profileSchema.joi,
        user,
        profileSchema.initialErrorMessages,
        profileSchema.initialErrorPrompts,
    )

  const postEditProfile = async (username, email, name, lastname) => {
    setLoading(true)

    const response = await handleRequest(
      'put',
      `/users/${user._id}`,
      {
        username,
        name,
        lastname,
        email,
      },
      {},
      true,
    )

    if (response) {
      /* console.log(response.status)*/
      if (response.status === 201) {
        /* console.log('response', response)*/
        setLoading(false)
        setHandleError(null)
        setHandleSuccess('User created successfully!')
      } else if (response.status === 409) {
        setLoading(false)
        setHandleSuccess(null)
        setHandleError('This username is already in use')
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

  const handleEdit = () => {
    if (!form.error) {
      postEditProfile(
        form.values.username,
        form.values.email,
        form.values.name,
        form.values.lastname,
      )
    }
  }

  return (
    /*TODO check for correct xl:w */
    <div
      className={`${styles.container} rounded-md m-6`}
    >
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
          value={form.values.lastname}
          onChange={form.onChange('lastname')}
          name="lastname"
          label="Last name"
          type="text"
          error={form.errorMessages.lastname}
          required
        />

        {handleError ? (
          <Notification type="danger" customStyles="mb-3">
            {handleError}
          </Notification>
        ) : null}

        {
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
            onClick={handleEdit}
            disabled={
              form.error ||
              form.values.username === '' ||
              form.values.email === '' ||
              form.values.name === '' ||
              form.values.lastname === '' ||
              loading
            }
            loading={loading}
          >
            Save
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default EditProfile
