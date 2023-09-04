import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './EventPage.module.css'
import { authStore } from '@context'
import ControlledPopup from '../../components/global/ControlledPopup/ControlledPopup'
import ParticipantsView from '@components/pages/EventPage'

const EventPage = () => {
  const navigate = useNavigate()
  const { _id } = useParams()
  const { handleRequest } = useApi()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { auth } = authStore
  const [userEventStatus, setUserEventStatus] = useState(null)
  const [userJoinedStatus, setUserJoinedStatus] = useState(null)
  const [participants, setParticipants] = useState([])

  const checkUserEventStatus = async () => {
    try {
      const response = await handleRequest(
        'POST',
        `/users/checkEvent/${auth.user.id}`,
        {
          event_id: _id,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      // console.log('save', response.data.saved)
      setUserEventStatus(response.data.saved)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    }
  }

  const checkJoinedStatus = async () => {
    try {
      const response = await handleRequest(
        'POST',
        `/events/checkJoinedStatus/${_id}`,
        {
          userId: auth.user.id,
        },
        {
          Authorization: 'Bearer' + auth.authToken,
        },
        true,
      )
      // console.log('JoinedStatusData:',response.data)
      setUserJoinedStatus(response.data.joined)
    } catch (error) {
      console.log(error)
      setError(
        'Error fetching joined status details, please try again later or contact support'
      )
    }
  }

  const getEventDetails = async (_id) => {
    try {
      setLoading(true)
      const response = await handleRequest('GET', `/events/${_id}`)
      setEvent(response.data)
      setParticipants(response.data.participants)
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
    // console.log('SaveEvent FUNC', response)
    checkUserEventStatus()
    checkJoinedStatus()
    // getEventDetails(_id)
  }

  const joinEvent = async () => {
    const response = await handleRequest(
      'POST',
        // `/users/checkEvent/${auth.user.id}`,
        `/events/joinEvent/${_id}`,
      {
        userId: `${auth.user.id}`,
      },
      {
        // Authorization: 'Bearer ' + auth.authToken,
      },
      false,
    )
    // console.log('SaveEvent FUNC', response)
    checkUserEventStatus()
    checkJoinedStatus()
    getEventDetails(_id)
  }

  const removeJoinedEvent = async () => {
    const response = await handleRequest(
      'POST',
        // `/users/checkEvent/${auth.user.id}`,
        `/events/removeJoinedEvent/${_id}`,
      {
        userId: `${auth.user.id}`,
      },
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    // console.log('SaveEvent FUNC', response)
    checkUserEventStatus()
    checkJoinedStatus()
    getEventDetails(_id)
    // setUsers(response.data)
  }

  const removeEvent = async () => {
    const response = await handleRequest(
      'POST',
      '/users/removeSavedEvent',
      {
        user_id: auth.user.id,
        event_id: _id,
      },
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    checkUserEventStatus()
    checkJoinedStatus()
    // getEventDetails(_id)
  }

  const [openValue, setOpenValue] = useState(false)
  const close = () => setOpenValue(false)

  useEffect(() => {
    getEventDetails(_id)
    checkUserEventStatus()
    checkJoinedStatus()
    // setOpenValue(false)
  }, [])

  /**
   * @useEffect
   * @description verify the availability of spaces to join an change the popup open status if its full
   * @notes The event object has to be not undefined to read the properties and not have errors
   */
  useEffect(() => {
    console.log('EventInfo:',event)
    if(!(event===undefined)){
      if((event?.participants.length)>=(event?.limit)){
        setOpenValue(true)
      } else {
        setOpenValue(false)
      }
    }
  }, [event])

  return (
    <div className={`${styles.container} standard_border`}>
      <div className={styles.event_container}>
        <ControlledPopup
          title="Event full!"
          isOpen = {openValue}
          closeFunction = {close}
        >
          <p>We're sorry, the event is already full...</p>
        </ControlledPopup>
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
              <p
                className={styles.event_creator}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/home/users/${event.creator._id}`)}
              >
                Created by: {event?.creator?.username}
                {event?.creator?._id === auth.user.id && ' (You)'}
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
            {!userEventStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                onClick={() => saveEvent()}
              >
                Save 💾
              </button>
            )}
            {userEventStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                onClick={() => removeEvent()}
              >
                Unsave ❌
              </button>
            )}
            {!userJoinedStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                onClick={() => {
                  console.log("participants:",event?.participants.length)
                  if((event?.participants.length)>=(event?.limit)){
                    setOpenValue(true)
                  } else {
                    joinEvent()
                  }
                }}
              >
                Join! 🫂
              </button>
            )}
            {userJoinedStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                onClick={() => {
                  removeJoinedEvent()
                  
                }}
              >
                Joined! 🙌🏼
              </button>
            )}
            <h3 className={styles.content_title}>Participants:</h3>
            <ParticipantsView participants={participants} />
            <h3 className={styles.content_title}>Description:</h3>
            <p className={styles.event_description}>{event?.description}</p>
            <h3 className={styles.content_title}>Limit: {event?.limit}</h3>
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
    </div>
  )
}

export default EventPage
