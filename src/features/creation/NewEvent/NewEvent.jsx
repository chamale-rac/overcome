// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'

import { authStore } from '@context'

import * as styles from './NewEvent.module.css'

import { Input, ToggleView, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { registerSchema, eventSchema } from '@schemas'

const Register = ({ customStyles, successAction, failAction }) => {
  const { auth } = authStore

  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState()
  const [handleSuccess, setHandleSuccess] = useState()
  const { handleRequest } = useApi()
  const form = useForm(
    eventSchema.joi,
    eventSchema.initialValues,
    eventSchema.initialErrorMessages,
    eventSchema.initialErrorPrompts,
  )

  const postEvent = async (
    title,
    description,
    date,
    duration,
    hour,
    tags,
    creator,
  ) => {
    setLoading(true)
    const tagArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '')
    const response = await handleRequest('post', '/events', {
      title,
      description,
      date,
      duration,
      hour,
      tags: tagArray,
      creator,
    })

    if (response) {
      console.log(response.status)
      if (response.status === 201) {
        console.log('response', response)
        setLoading(false)
        setHandleError(null)
        setHandleSuccess('Event created successfully')
        form.totalClean()
      } else if (response.status === 500) {
        setLoading(false)
        setHandleSuccess(null)
        setHandleError('Error creating event')
        console.log('error response', response)
      }
    } else {
      setLoading(false)
      setHandleSuccess(null)
      setHandleError('Something went wrong')
    }
  }

  const handlePublish = () => {
    console.log('handle publish')
    if (!form.error) {
      postEvent(
        form.values.title,
        form.values.description,
        form.values.date,
        form.values.duration,
        form.values.hour,
        form.values.tags,
        auth.user.id,
      )
    }
  }

  return (
    /*TODO check for correct xl:w */
    <div
      className={`${styles.container} rounded-md  w-4/5 m-6 ${customStyles}`}
    >
      <h1 className={`${styles.title} font-bebas-neue text-[4rem]`}>
        New Event 📋
      </h1>
      <div>
        <Input
          value={form.values.title}
          onChange={form.onChange('title')}
          name="title"
          label="Title"
          type="text"
          error={form.errorMessages.title}
          required
        />
        <Input
          value={form.values.description}
          onChange={form.onChange('description')}
          name="description"
          label="Description"
          type="text"
          error={form.errorMessages.description}
          required
          isTextArea
          customStyles="h-20"
          maxLength={60}
        />
        <Input
          value={form.values.date}
          onChange={form.onChange('date')}
          name="date"
          label="Date"
          type="date"
          error={form.errorMessages.date}
          required
        />
        <Input
          value={form.values.duration}
          onChange={form.onChange('duration')}
          name="duration"
          label="Duration (minutes)"
          type="number"
          error={form.errorMessages.duration}
          required
        />

        <Input
          value={form.values.hour}
          onChange={form.onChange('hour')}
          name="hour"
          label="Hour"
          type="time"
          error={form.errorMessages.hour}
          required
        />

        <Input
          value={form.values.tags}
          onChange={form.onChange('tags')}
          name="tags"
          label="Tags"
          type="text"
          error={form.errorMessages.tags}
          required
          hasTags
          delimiter=","
        />

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
            </Notification>
          ) : null
        }

        {!handleSuccess ? (
          <Button
            type="primary"
            onClick={handlePublish}
            disabled={
              form.error ||
              form.values.title === '' ||
              form.values.description === '' ||
              form.values.date === '' ||
              form.values.duration === '' ||
              form.values.hour === '' ||
              form.values.tags === '' ||
              loading
            }
            loading={loading}
          >
            Publish
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default Register
