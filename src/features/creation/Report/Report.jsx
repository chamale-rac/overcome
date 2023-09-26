import React, { useState } from 'react'

import * as styles from './Report.module.css'
import { Input, Button, Notification } from '@components/global'
import { useApi, useForm } from '@hooks'
import { authStore } from '@context'
import { reportSchema } from '@schemas'

const Report = ({ type = '', relatedId = '', reportToTitle = '' }) => {
  const { auth } = authStore
  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState()
  const [handleSuccess, setHandleSuccess] = useState(null)

  const [reportFor, setReportFor] = useState('')
  const [whatIsGoingOn, setWhatIsGoingOn] = useState('')

  const { handleRequest } = useApi()

  const form = useForm(
    reportSchema.joi,
    reportSchema.initialValues,
    reportSchema.initialErrorMessages,
    reportSchema.initialErrorPrompts,
  )

  const postReport = async (
    reporter,
    type,
    relatedId,
    reportFor,
    whatIsGoingOn,
    description,
  ) => {
    try {
      setLoading(true)

      let assignRelatedIdTo

      if (type === 'User') {
        assignRelatedIdTo = 'perpetrator'
      } else if (type === 'Event') {
        assignRelatedIdTo = 'eventId'
      } else {
        throw new Error('Invalid report type')
      }

      const response = await handleRequest(
        'post',
        '/reports',
        {
          reporter,
          type,
          reportFor,
          whatIsGoingOn,
          comments: description,
          [assignRelatedIdTo]: relatedId,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
    } catch (error) {
      console.log('error :>> ', error.message)
      setHandleError(error.message)
      setHandleSuccess(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = () => {
    if (!form.error && reportFor !== '' && whatIsGoingOn !== '') {
      postReport(
        auth.user.id,
        type,
        relatedId,
        reportFor,
        whatIsGoingOn,
        form.values.description,
      )
    }
  }

  return (
    <div className={`${styles.container} rounded-md m-6`}>
      <div>
        <Input
          value={form.values.description}
          onChange={form.onChange('description')}
          name="description"
          label="Comments"
          type="text"
          error={form.errorMessages.description}
          required
          isTextArea
          customStyles="h-25"
          maxLength={200}
          placeholder={'Describe your claim...'}
        />
      </div>
    </div>
  )
}

export default Report
