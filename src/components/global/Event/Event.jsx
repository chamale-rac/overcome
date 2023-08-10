import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Event.module.css'
import { authStore } from '@context'
import { useApi } from '@hooks'

function Event({
  name,
  people,
  hour,
  date,
  link,
  creator,
  url,
  _id,
  creator_id,
  inProfile = false,
}) {
  const { handleRequest } = useApi()
  const { auth } = authStore

  const [userEventStatus, setUserEventStatus] = useState(null)

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
      console.log('save', response.data.saved)
      setUserEventStatus(response.data.saved)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    }
  }

  // const response = await handleRequest('GET', '/users/saveEvent', {user_id: asdasd, event_id: asdasda},
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
    checkUserEventStatus()
    // setUsers(response.data)
  }

  useEffect(() => {}, [auth])

  useEffect(() => {
    checkUserEventStatus()
  }, [])

  const navigate = useNavigate()
  return (
    <div
      className={styles.container}
      style={{ margin: !inProfile === true ? '0px' : '' }}
    >
      <h1>{name}</h1>

      <p className={styles.creator}>
        Creator:{' '}
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '0',
            margin: '0',
          }}
          onClick={() => navigate(`/home/users/${creator_id}`)}
        >
          {creator}
        </span>
      </p>
      <p style={{ padding: '0px', margin: '0' }}>Hour: {hour}</p>
      <p style={{ padding: '0px', margin: '0' }}>Date: {date}</p>
      {/*
      //people is still no added to the model
      <div>People: {people.map((person) => person.username).join(', ')}</div> */}
      <div
        className="mt-3"
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <a style={{ padding: '0', margin: '0', textAlign: 'left' }}>
          {link}
          <br />
        </a>
        {url && (
          <>
            <br />
            {/* <a href={url} target="_blank">
              Link: {url}
            </a> */}
          </>
        )}
      </div>
      <div className={styles.flex}>
        {userEventStatus !== null && (
          <>
            {!inProfile && !userEventStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                onClick={() => saveEvent()}
              >
                Save 💾
              </button>
            )}
            {/* {!inProfile && userEventStatus && ( */}
            { userEventStatus && (
              <button
                className={`${styles.saveButton} button asap`}
                disabled
              >
                Unsave ❌
              </button>
            )}
            <button
              className={`button asap`}
              onClick={() => navigate(`/home/events/${_id}`)}
            >
              Details 🧮
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Event
