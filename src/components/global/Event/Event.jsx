import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Event.module.css'
import { authStore } from '@context'
import { useApi } from '@hooks'

function Event({ name, people, hour, date, link, creator, url, _id }) {
  const { handleRequest } = useApi()
  const { auth } = authStore

  // const response = await handleRequest('GET', '/users/saveEvent', {user_id: asdasd, event_id: asdasda}, 
  const saveEvent = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest('POST', '/users/saveEvent', 
      {
        user_id: auth.user.id,
        event_id: _id,
      }, 
      {
        'Authorization': 'Bearer ' + auth.authToken
      },
      true)
    console.log('SaveEvent FUNC', response)
    // setUsers(response.data)
  }

  useEffect(() => {
    console.log(auth)
    console.log(auth.user.username, auth.user.id)
  }, [auth])

  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p>Creator: {creator}</p>
      <p>Hour: {hour}</p>
      <p>Date: {date}</p>
      {/*
      //people is still no added to the model
      <div>People: {people.map((person) => person.username).join(', ')}</div> */}
      <div
        className="mt-3"
        style={{
          width: '100%',
          textAlign: 'end',
        }}
      >
        <a>
          {link}
          <br />
        </a>
        {url && (
          <>
            <br />
            <a href={url} target="_blank">
              Link: {url}
            </a>
          </>
        )}
      </div>
      <div className={styles.flex}>
        <button onClick={() => saveEvent()} >Save 💾</button>
        <button onClick={() => navigate(`/home/events/${_id}`)}>
          Details 🧮
        </button>
      </div>
    </div>
  )
}

export default Event
