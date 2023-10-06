import { useEffect, useState } from 'react'
import * as styles from './Events.module.css'
import Event from '@components/global/Event'
import { authStore } from '@context'
import { useApi } from '@hooks'

const Events = ({ events, inProfile = false }) => {
  const { handleRequest } = useApi()
  const { auth } = authStore

  const getUser = async () => {
    const response = await handleRequest(
      'GET',
      '/users/:',
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    /* console.log('USER!', response)*/
  }

  useEffect(() => {
    /* console.log(auth)*/
    // /* console.log(auth.user.username, auth.user.id)*/
    // console.log("In profile "+ inProfile)
  }, [auth])

  return (
    <>
      {events.map((event) => (
        <Event
          key={event._id}
          _id={event._id}
          name={event.title}
          hour={event.hour}
          date={event.date != undefined && event.date.substring(0, 10)}
          people={event.participants}
          creator={event.creator?.username}
          creator_id={event.creator?._id}
          link={
            event.tags != undefined &&
            'Tags: ' +
              JSON.stringify(event.tags)
                .replace('[', '')
                .replace(']', '')
                .replace(/"/g, '')
                .replace(/,/g, ', ')
          }
          url={event?.link}
          inProfile={inProfile}
        />
      ))}
    </>
  )
}

export default Events
