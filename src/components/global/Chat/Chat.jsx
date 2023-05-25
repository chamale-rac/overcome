import React, { useState, useEffect, useMemo } from 'react'
import * as styles from './Chat.module.css'
import ChatInput from './ChatInput/ChatInput'
import { authStore } from '@context'
import { useApi } from '@hooks'
import ChatMessage from './ChatMessage/ChatMessage'

const Chat = ({ _id, name }) => {
  const { auth } = authStore
  const { handleRequest } = useApi()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userColors, setUserColors] = useState({})

  const sendMessage = async (message) => {
    console.log('Sending message', message)
    try {
      const response = await handleRequest('post', '/chats/message', {
        chat_id: _id,
        message,
        user_id: auth.user.id,
      })
      if (response.status === 200) {
        console.log('200')
        getMessages()
      } else {
        setError('Error sending message')
      }
    } catch (error) {
      console.error(error)
      setError('Error sending message')
    }
  }

  const sendHandler = (message) => {
    sendMessage(message)
    return true
  }

  const getMessages = async () => {
    try {
      setLoading(true)
      const response = await handleRequest('GET', `/chats/${_id}`, {}, true)
      console.log('Chat!', response)
      if (response.status === 200) {
        console.log('200')
        // get just new messages
        if (messages.length < response.data.messages.length) {
          const newMessages = response.data.messages.slice(messages.length)
          setMessages([...messages, ...newMessages])
          scrollToBottom()
        }
      } else {
        setError('Error getting messages')
      }
    } catch (error) {
      console.error(error)
      setError('Error getting messages')
    } finally {
      setLoading(false)
    }
  }

  const numParticipants = useMemo(() => {
    const participants = messages.map((message) => message.user._id)
    return [...new Set(participants)].length
  }, [messages])

  useEffect(() => {
    if (_id) {
      getMessages()
    }
  }, [_id])

  const scrollToBottom = () => {
    const chatDisplay = document.getElementById('chatDisplay')
    chatDisplay.scrollTop = chatDisplay.scrollHeight
  }

  // Check for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id={_id} className={`${styles.container} standard_border`}>
      <div className={`${styles.title_wrapper} font-bebas-neue`}>
        <div>
          Chat: <span style={{ marginLeft: '0.2rem' }}>{name}</span>
        </div>
        <div className={`${styles.participants} font-overpass-mono`}>
          <span style={{ marginRight: '0.4rem' }}>{numParticipants}</span>
          users 👥
        </div>
      </div>
      <div className={styles.display_wrapper}>
        <div id="chatDisplay" className={styles.messages_wrapper}>
          {messages?.map((message, index) => {
            return (
              <ChatMessage
                key={message._id}
                user={message.user}
                text={message.message}
                sent_at={message.sent_at}
                actual_user_id={auth.user.id}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.input_wrapper}>
        <ChatInput handleSend={sendHandler} />
      </div>
    </div>
  )
}

export default Chat