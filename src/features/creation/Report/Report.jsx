import React, { useState } from 'react'

import * as styles from './Report.module.css'
import { Input, Button, Notification, Dropdown } from '@components/global'
import { useApi, useForm } from '@hooks'
import { authStore } from '@context'
import { reportSchema } from '@schemas'

const Report = ({
  type = '',
  relatedId = '',
  reportToTitle = '',
  closeAction,
}) => {
  const { auth } = authStore
  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState()
  const [handleSuccess, setHandleSuccess] = useState(null)

  const [reportFor, setReportFor] = useState('Select an option...')
  const [whatIsGoingOn, setWhatIsGoingOn] = useState('Select an option...')

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
      // Handle 500
      if (response.status !== 200) {
        setHandleError('Something went wrong. Please try again later.')
        setHandleSuccess(null)
      } else {
        setHandleSuccess('Report sent successfully! 🚀')
        setHandleError(null)
      }
    } catch (error) {
      console.log('error :>> ', error.message)
      setHandleError(error.message)
      setHandleSuccess(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = () => {
    if (
      !form.error &&
      reportFor !== 'Select an option...' &&
      whatIsGoingOn !== 'Select an option...'
    ) {
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
    <div className={`${styles.container} rounded-md m-6 w-[400px]`}>
      <h3 className="font-bebas-neue text-2xl mb-6 ">
        You are reporting ({type}): {reportToTitle}
      </h3>

      <div>
        <Dropdown
          label="Who is being affected?*"
          customStyles="mb-5"
          options={[
            'Me',
            'Another person or a specific group of people',
            'This affects everyone',
          ]}
          selected={reportFor}
          setSelected={setReportFor}
        />
        <Dropdown
          label="What is going on?*"
          customStyles="mb-5"
          options={[
            'Identity attack',
            'Harassment or intimidation with violence',
            'Spam',
            'Impersonation',
            'Self-harm',
            'Sensitive or disturbing content',
            'Deceptive solicitation',
          ]}
          selected={whatIsGoingOn}
          setSelected={setWhatIsGoingOn}
        />
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
          placeholder={'Your claim...'}
        />

        {handleError ? (
          <Notification type="danger" customStyles="mb-3">
            {handleError}
          </Notification>
        ) : null}

        {handleSuccess ? (
          <Notification type="" customStyles="mb-3">
            <p className="mb-1 p-1">
              {handleSuccess}
              <br />
              Check your email for updates.
            </p>
            <Button
              customStyles="mb-1"
              type="primary"
              onClick={() => closeAction()}
            >
              Close
            </Button>
          </Notification>
        ) : null}
        {!handleSuccess ? (
          <Button
            type="primary"
            onClick={handlePost}
            disabled={
              form.error ||
              form.values.description === '' ||
              reportFor === 'Select an option...' ||
              whatIsGoingOn === 'Select an option...' ||
              loading
            }
            loading={loading}
          >
            Send report
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default Report
