import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './UserPage.module.css'

const UserPage = () => {
  const navigate = useNavigate()
  const { creator_id } = useParams()
  const { handleRequest } = useApi()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getEventDetails = async (_id) => {
    try {
      setLoading(true)
      const response = await handleRequest('GET', `/events/${_id}`)
      setEvent(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // getEventDetails(_id)
  }, [])

  return (
    <div className={`${styles.container} standard_border`}>
      <div className={styles.event_container}>
        <NavButton
          type="normal"
          handleClick={() => navigate(-1)}
          customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base mb-20"
        >
          ⇐ Back
        </NavButton>
        {creator_id}
      </div>
    </div>
  )
}

export default UserPage
