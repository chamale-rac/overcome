import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Event.module.css'
import { authStore } from '@context'

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
}) {
  const { auth } = authStore

  useEffect(() => {
    console.log(auth)
    console.log(auth.user.username, auth.user.id)
  }, [auth])

  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p className={styles.creator}>
        Creator:{' '}
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => navigate(`/home/users/${creator_id}`)}
        >
          {creator}
        </span>
      </p>
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
        <button className={`button asap`}>Save 💾</button>
        <button
          className={`button asap`}
          onClick={() => navigate(`/home/events/${_id}`)}
        >
          Details 🧮
        </button>
      </div>
    </div>
  )
}

export default Event
