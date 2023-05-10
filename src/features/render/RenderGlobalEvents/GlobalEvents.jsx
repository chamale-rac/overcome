import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import Event from '@components/global/Event'

function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])
  const { handleRequest } = useApi()

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const response = await handleRequest('GET', '/events', {}, {}, false)
    // console.log('data!', response)
    setUserEvents(response.data)
  }

  return (
    <div className={styles.container}>
      <h1>Community Events!</h1>
      <h2>This are today's Hooks!</h2>
      <div className={styles.eventsContainer}>
        {userEvents.map((event) => (
          <Event
            name={event.title}
            hour={event.hour}
            date={event.date != undefined && event.date.substring(0, 10)}
            people={event.participants}
            link={
              event.tags != undefined &&
              JSON.stringify(event.tags)
                .replace('[', '')
                .replace(']', '')
                .replace(/"/g, '')
                .replace(/,/g, ', ')
            }
          />
        ))}
      </div>
    </div>
  )
}

export default GlobalEvents
