import * as styles from './UserEvents.module.css'
import Event from '@components/global/Event'
import useRefreshToken from '@hooks/useRefreshToken'
import { useState, useEffect } from 'react'

function UserEvents({ event }) {
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    setUserEvents(events)
    /* console.log('events in UserEvents', events)*/
  }, [])

  return (
    <div className={styles.root}>
      <h1>My Events</h1>
      {/* <button onClick={() => refresh()}>Refresh</button> */}
      <div className={styles.container}>
        {userEvents.map((event) => (
          <Event
            _id={event._id}
            name={event.title}
            hour={event.hour}
            people={event.people}
            link={event.link}
          />
        ))}
      </div>
    </div>
  )
}

export default UserEvents
