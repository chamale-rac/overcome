import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './EventPage.module.css'
import { authStore } from '@context'
import ControlledPopup from '../../components/global/ControlledPopup/ControlledPopup'
import ParticipantsView from '@components/pages/EventPage'
import Report from '@features/creation/Report/Report'
import SkeletonElement from '@components/skeletons/SkeletonElement'
import Shimmer from '@components/skeletons/Shimmer'


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
        'Error fetching joined status details, please try again later or contact support',
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

  const joinEventToUser = async () => {
    const response = await handleRequest(
      'POST',
      '/users/joinEvent',
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
    await checkJoinedStatus()
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

  const removeJoinedEventToUser = async () => {
    const response = await handleRequest(
      'POST',
      '/users/removeJoinedEvent',
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
  const [reportOpenValue, setReportOpenValue] = useState(false)
  const close = () => setOpenValue(false)
  const closeReport = () => setReportOpenValue(false)

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
    console.log('EventInfo:', event)
    if (!(event === undefined)) {
      if (event?.participants.length >= event?.limit) {
        if (userJoinedStatus === true) {
          setOpenValue(false)
        } else {
          setOpenValue(true)
        }
      } else {
        setOpenValue(false)
      }
    }
  }, [event])

  return (
    <div className={`${styles.container} standard_border`}>
      <ControlledPopup
        title="Reporting"
        isOpen={reportOpenValue}
        closeFunction={closeReport}
      >
        <Report
          type="Event"
          relatedId={_id}
          reportToTitle={event?.title}
          closeAction={closeReport}
        />
      </ControlledPopup>
      <div className={styles.event_container}>
        <ControlledPopup
          title="Event full!"
          isOpen={openValue}
          closeFunction={close}
        >
          <p>We're sorry, the event is already full...</p>
        </ControlledPopup>
        <NavButton
          type="normal"
          handleClick={() => navigate(-1)}
          customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base mb-4"
        >
          ⇐ Back
        </NavButton>
        {event && (
          <>
            <div className={styles.title_wrapper}>
              <div>
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
              <button
                className={`mt-0 ${styles.saveButton} button asap`}
                onClick={() => setReportOpenValue((o) => !o)}
              >
                <span>🚩</span>
              </button>
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
            <div className={`${styles.actions} `}>
              {!userEventStatus && (
                <button
                  className={`${styles.saveButton} button asap`}
                  onClick={() => {
                    saveEvent()
                  }}
                >
                  Save 💾
                </button>
              )}
              {userEventStatus && (
                <button
                  className={`${styles.saveButton} button asap`}
                  onClick={() => {
                    removeEvent()
                  }}
                >
                  Unsave ❌
                </button>
              )}
              {!userJoinedStatus && (
                <button
                  className={`${styles.saveButton} button asap`}
                  onClick={() => {
                    console.log('participants:', event?.participants.length)
                    if (event?.participants.length >= event?.limit) {
                      setOpenValue(true)
                    } else {
                      joinEvent()
                      joinEventToUser()
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
                    removeJoinedEventToUser()
                  }}
                >
                  Joined! 🙌🏼
                </button>
              )}
            </div>
            <div className={`${styles.details}`}>
              <h3 className={styles.content_title}>
                Participants ({event?.participants.length}/{event?.limit}):
                {participants.map((participant) => (
                  <p key={participant._id}>
                    <b>{participant.username}</b>
                  </p>
                ))}
              </h3>
              {/* <ParticipantsView participants={participants} /> */}
              <h3 className={styles.content_title}>
                Description: {event?.description}
              </h3>
              <div className={`${styles.content_wrapper}`}>
                <h3>Schedule:</h3>
                <p className={styles.event_hour}>{event?.hour}</p>
                <p className={styles.event_date}>
                  {event && new Date(event.date).toLocaleDateString()}
                </p>
                <p className={styles.event_duration}>
                  {event?.duration} minutes
                </p>
              </div>
            </div>

            <div className={styles.content_wrapper}>
              <h3>Tags:</h3>
              {event?.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            <div className={styles.content_wrapper}>
              <h3>Links:</h3>
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
        {!event && (
          <>
            <header className={styles.skeleton_event_header}>
              <SkeletonElement type="title"/>
              <SkeletonElement type="text"/>
              <Shimmer/>
            </header>
            <hr
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
                border: 'none',
                margin: '1.5rem 0px 1rem 0px',
              }}
            />
            <article class={styles.skeleton_event_body}>
              <aside className={styles.skeleton_buttons_container}>
                <SkeletonElement type="button"/>
                <SkeletonElement type="button"/>
              </aside>
              <ul className={styles.skeleton_event_details_container}>
                <li><SkeletonElement type="text"/></li>
                <li><SkeletonElement type="text"/></li>
                <li><SkeletonElement type="text"/></li>
                <li><SkeletonElement type="text"/></li>
                <li><SkeletonElement type="text"/></li>
                <li><SkeletonElement type="text"/></li>
              </ul>
              <Shimmer/>
            </article>
          </>
        )}
      </div>
      <div className={styles.chat_container}>
        {userJoinedStatus ? (
          <Chat _id={event?.chat} name={event?.title} />
        ) : (
          <div className={styles.dummy_chat}>
            Looks like you're missing out on all the fun!
            <br />
            Join the event to unlock the chat! 🎉
          </div>
        )}
      </div>
    </div>
  )
}

export default EventPage
