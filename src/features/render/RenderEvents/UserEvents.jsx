import * as styles from './UserEvents.module.css'
import Event from '@components/global/Event'
import useRefreshToken from '@hooks/useRefreshToken'
import { useState, useEffect } from 'react'

const events = [
  {
    title: "Call of duty",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "League of Legends",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "Minecraft",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "Chess",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "FIFA",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "Need for Speed",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "Cuphead",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "Spiderman PS4",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
  {
    title: "NBA 2k24",
    hour: "11:23",
    people: "Pablo, Andres",
    link: "https://discord.gg/XvNTrMyE",
  },
]

function UserEvents() {
  const refresh = useRefreshToken()
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    setUserEvents(events)
  }, [])

  return (
    <div className={styles.root}>
      <h1>My Events</h1>
      <button onClick={() => refresh()}>Refresh</button>
      <div className={styles.container}>
        {
          userEvents.map( event => (
            <Event
              name = {event.title}
              hour = {event.hour}
              people = {event.people}
              link = {event.link}
            />
          ))
        }
      </div>
    </div>
  )
}

export default UserEvents
