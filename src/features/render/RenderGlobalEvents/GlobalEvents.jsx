import { useState, useEffect } from 'react'
import * as styles from './GlobalEvents.module.css'
import Event from '@components/global/Event'

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

function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    setUserEvents(events)
  }, [])

  return (
    <div className={styles.container} >
      <h1>Community Events!</h1>
      <h2>This are today Hooks!</h2>
      <div className={styles.eventsContainer} >
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

export default GlobalEvents
