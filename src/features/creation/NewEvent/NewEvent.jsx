// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'
import { SERVICES_BASE_URL } from '@utils/constants'

import { authStore } from '@context'

import * as styles from './NewEvent.module.css'

import { Input, ToggleView, Button, Notification } from '@components/global'

import { useApi, useForm } from '@hooks'

import { registerSchema, eventSchema } from '@schemas'

const Register = ({ customStyles, successAction, failAction }) => {
  const { auth } = authStore

  const [dateError, setDateError] = useState({
    error: false,
    code: null,
    message: '',
  })
  const [hourError, setHourError] = useState({
    error: false,
    message: '',
  })

  const [iaLoading, setIALoading] = useState(false)
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
    link,
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
      link,
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
        form.values.link,
      )
    }
  }

  const postAI = async (title, date, duration, hour, tags) => {
    setIALoading(true)
    try {
      const response = await fetch(`${SERVICES_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          duration,
          hour,
          tags,
        }),
      })

      const data = await response.json()
      form.setValue('description', data.description.replace(/\n/g, ''))
    } catch (error) {
      alert(error)
      form.setValue('description', 'Error getting description')
    }
    setIALoading(false)
  }

  const handleIA = () => {
    console.log('handle AI')
    postAI(
      form.values.title,
      form.values.date,
      form.values.duration,
      form.values.hour,
      form.values.tags,
    )
  }

  const checkDate = (desiredDate) => {
    const now = new Date()
    const today = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Guatemala' }),
    )
    const date = new Date(desiredDate + 'T00:00:00-06:00')

    const todayUtc6 = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
    )
    const dateUtc6 = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    )
    console.log('today', todayUtc6.getTime())
    console.log('date', dateUtc6.getTime())

    if (dateUtc6.getTime() < todayUtc6.getTime()) {
      return -1
    } else if (dateUtc6.getTime() === todayUtc6.getTime()) {
      return 0
    } else {
      return 1
    }
  }

  useEffect(() => {
    if (form.values.date) {
      if (checkDate(form.values.date) === -1) {
        setDateError({
          error: true,
          code: -1,
          message: 'Date must be in the future',
        })
      } else if (checkDate(form.values.date) === 0) {
        setDateError({
          error: false,
          code: 0,
          message: '',
        })
      } else {
        setDateError({
          error: false,
          code: 1,
          message: '',
        })
      }
    }
  }, [form.values.date])

  useEffect(() => {
    if (form.values.date && form.values.hour) {
      const now = new Date()
      const utcMinus6Hours = now.getUTCHours() - 6
      const minutes = now.getUTCMinutes()
      console.log('utcMinus6Hours', utcMinus6Hours)
      console.log('minutes', minutes)
      const timeString = utcMinus6Hours.toString() + minutes.toString()
      const timeIntNow = parseInt(timeString, 10)

      const timeIntHour = parseInt(form.values.hour.replace(':', ''), 10)

      console.log('timeIntNow', timeIntNow)
      console.log('timeIntHour', timeIntHour)

      if (dateError.code === 0) {
        if (timeIntHour < timeIntNow) {
          setHourError({
            error: true,
            message: 'Hour must be in the future',
          })
        } else {
          setHourError({
            error: false,
            message: '',
          })
        }
      } else if (dateError.code === 1) {
        setHourError({
          error: false,
          message: '',
        })
      }
    }
  }, [form.values.date, form.values.hour])

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
          value={form.values.date}
          onChange={form.onChange('date')}
          name="date"
          label="Date"
          type="date"
          error={form.errorMessages.date || dateError.message}
          required
        />

        <Input
          value={form.values.hour}
          onChange={form.onChange('hour')}
          name="hour"
          label="Hour"
          type="time"
          error={form.errorMessages.hour || hourError.message}
          required
          disabled={
            dateError.error || !form.values.date || form.errorMessages.date
          }
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
          value={form.values.link}
          onChange={form.onChange('link')}
          name="link"
          label="Link"
          type="text"
          error={form.errorMessages.link}
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

        <aside>
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
            disabled={
              form.values.title === '' ||
              form.values.date === '' ||
              form.values.duration === '' ||
              form.values.hour === '' ||
              form.values.tags === ''
            }
            placeholder={iaLoading ? 'AI description will appear here.."' : ''}
          />
          {!(
            form.values.title === '' ||
            form.values.date === '' ||
            form.values.duration === '' ||
            form.values.hour === '' ||
            form.values.tags === ''
          ) && (
            <div className={styles.ai} onClick={handleIA}>
              <div className={styles.ai_emoji}>✨</div>
              <span className={styles.tool}>AI description</span>
            </div>
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
            </Notification>
          ) : null
        }

        {!handleSuccess ? (
          <Button
            type="primary"
            onClick={handlePublish}
            disabled={
              form.error ||
              form.values.description === '' ||
              form.values.title === '' ||
              form.values.date === '' ||
              form.values.duration === '' ||
              form.values.hour === '' ||
              form.values.tags === '' ||
              loading ||
              dateError.error ||
              hourError.error
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
