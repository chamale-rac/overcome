import * as styles from './HomePage.module.css'
import { useState, useEffect } from 'react'
import EventPreview from '../../../components/global/EventPreview'
import ChatPreview from '../../../components/global/ChatPreview'
import { authStore } from '@context'
import { useApi } from '@hooks'

function HomePage() {
  const { handleRequest } = useApi()
  const { auth } = authStore
  const [savedEvents, setSavedEvents] = useState([])
  const [chats, setChats] = useState([])

  useEffect(() => {
    getSavedEvents()
    getChats()
  }, [])

  useEffect(() => {
    console.log('SAVED EVENTS!!')
    console.log(savedEvents)
  }, [savedEvents])

  useEffect(() => {
    console.log('Var Chats:',chats)
  }, [chats])

  // useEffect(() => {
  //   console.log(auth)
  //   console.log(auth.user.username, auth.user.id)
  // }, [auth])

  const getSavedEvents = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'GET',
      '/users/saved-events/'+auth.user.id,
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    console.log('RESPONSE saved events!!', response)
    setSavedEvents(response.data.savedEvents)
  }

  const getChats = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'GET',
      '/chats/messages/'+auth.user.id,
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    console.log('RESPONSE CHATS!!', response.data)
    setChats(response.data)
  }

  return (
    <div className={styles.container}>
      <h1>Welcome back {auth.user.username}</h1>
      <h2>
        What people are you meeting today? <br/>
      </h2>
      <div className={styles.board}>
        <div className={styles.boardItem}>
          <h3>🎉 Recent events:</h3>
          <EventPreview
            events={savedEvents}
          />
        </div>
        <div className={styles.boardItem}>
          <h3>📌 Pinned Games:</h3>
          {/* <EventPreview
            events={savedEvents}
            /> */}
          We're sorry,<br/>
          Saving games feature<br/>
          not available yet.
        </div>
        <div className={styles.boardItem}>
          <h3>🗨️ Recent Chats:</h3>
          <ChatPreview 
            chats={chats}
          />
        </div>
        <div className={styles.boardItem}>
          <h1>+</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage
