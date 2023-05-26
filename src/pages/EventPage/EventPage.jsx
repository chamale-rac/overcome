import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './EventPage.module.css'
import { authStore } from '@context'

const EventPage = () => {
  const navigate = useNavigate()
  const { _id } = useParams()
  const { handleRequest } = useApi()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { auth } = authStore

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

  const saveEvent = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'POST',
      '/users/saveEvent',
      {
        user_id: auth.user.id,
        event_id: _id,
      },
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    console.log('SaveEvent FUNC', response)
    // setUsers(response.data)
  }

  useEffect(() => {
    getEventDetails(_id)
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
        {event && (
          <>
            <div className={styles.title_wrapper}>
              <h2 className={`${styles.event_title} font-bebas-neue`}>
                {event?.title}
              </h2>
              <p className={styles.event_creator}>
                Created by: {event?.creator?.username}
              </p>
            </div>
            <hr
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
                border: 'none',
                margin: '0px 0',
              }}
            />
            <button className={`${styles.saveButton} button asap`} onClick={() => saveEvent()}>
              Save 💾
            </button>
            <h3 className={styles.content_title}>Description:</h3>
            <p className={styles.event_description}>{event?.description}</p>
            {/* TODO: add participants
            <ul className={styles.event_participants}>
              {event?.participants.map((participant) => (
                <li key={participant._id}>{participant.username}</li>
              ))}
            </ul> */}
            <div className={styles.content_wrapper}>
              <h3>Schedule:</h3>
              <p className={styles.event_hour}>{event?.hour}</p>
              <p className={styles.event_date}>
                {event && new Date(event.date).toLocaleDateString()}
              </p>
              <p className={styles.event_duration}>{event?.duration} minutes</p>
            </div>
            <div className={styles.content_wrapper}>
              <h3>Tags:</h3>
              {event?.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            <div className={styles.content_wrapper}>
              <h3>Link:</h3>
              <a
                href={event?.link}
                target="_blank"
                className={styles.event_link}
              >
                {event?.link}
              </a>
            </div>
          </>
        )}
      </div>
      <div className={styles.chat_container}>
        <Chat _id={event?.chat} name={event?.title} />
      </div>
      {/**      
      <div>{loading && <div>Loading...</div>}</div>
      <div>{error && <div>{error}</div>}</div>
       */}
    </div>
  )
}

export default EventPage
