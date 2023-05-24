import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams } from 'react-router-dom'
import * as styles from './EventPage.module.css'

const EventPage = () => {
  const { _id } = useParams()
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
    getEventDetails(_id)
  }, [])

  return (
    <div className={`${styles.container} ${styles.standard_border}`}>
      <div className={styles.event}>
        {event && (
          <>
            <h2 className={styles.event_title}>{event?.title}</h2>
            <p className={styles.event_description}>{event?.description}</p>
            <ul className={styles.event_participants}>
              {event?.participants.map((participant) => (
                <li key={participant._id}>{participant.username}</li>
              ))}
            </ul>
            <p className={styles.event_date}>
              {event && new Date(event.date).toLocaleDateString()}
            </p>
            <p className={styles.event_duration}>{event?.duration} minutes</p>
            <p className={styles.event_chat}>{event?.chat}</p>
            <ul className={styles.event_tags}>
              {event?.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>{loading && <div>Loading...</div>}</div>
      <div>{error && <div>{error}</div>}</div>
      <div>{event && <div>{JSON.stringify(event)}</div>}</div>
    </div>
  )
}

export default EventPage
