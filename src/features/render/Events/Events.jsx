import React from 'react'
import * as styles from './Events.module.css'
import Event from '@components/global/Event'

const Events = ({ events }) => {
  return (
    <>
      {events.map((event) => (
        <Event
          name={event.title}
          hour={event.hour}
          date={event.date != undefined && event.date.substring(0, 10)}
          people={event.participants}
          link={
            event.tags != undefined &&
            'Tags: ' +
              JSON.stringify(event.tags)
                .replace('[', '')
                .replace(']', '')
                .replace(/"/g, '')
                .replace(/,/g, ', ')
          }
        />
      ))}
    </>
  )
}

export default Events
