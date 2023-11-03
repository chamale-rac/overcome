import React, { useState, useEffect, useRef } from 'react'
import * as styles from './Chat.module.css'
import ChatInput from './ChatInput/ChatInput'
import { authStore } from '@context'
import { useApi } from '@hooks'
import ChatMessage from './ChatMessage/ChatMessage'
import socketIO, { io } from 'socket.io-client'

const Chat = ({ _id, name }) => {
  const { auth } = authStore
  const { handleRequest } = useApi()

  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userColors, setUserColors] = useState({})

  const chatSocket = io('http://127.0.0.1:3000/chat', {
    withCredentials: true,
    secure: true,
  })

  useEffect(() => {
    getMessages()
    chatSocket.connect()

    chatSocket.on('connect', () => {
      console.log('Successfully connected!')
    })

    return () => {
      chatSocket.disconnect()
    }
  }, [])

  const sendMessage = (message) => {
    chatSocket.emit('message', {
      message,
      chat_id: _id,
      user_id: auth.user.id,
      _id: _id,
    })
    setMessages([
      ...messages,
      {
        message: message,
        chat_id: _id,
        user: {
          _id: auth.user.id,
          username: auth.user.username,
        },
        actual_user_id: auth.user.id,
        sent_at: new Date(),
      },
    ])
  }

  chatSocket.on('receive-message', (message) => {
    if (message.user._id !== auth.user.id) {
      setMessages([...messages, message])
    }
  })

  // const sendMessage = async (message) => {
  //   try {
  //     const response = await handleRequest('post', '/chats/message', {
  //       chat_id: _id,
  //       message,
  //       user_id: auth.user.id,
  //     })
  //     if (response.status === 200) {
  //       getMessages()
  //     } else {
  //       setError('Error sending message')
  //     }
  //   } catch (error) {
  //     setError('Error sending message')
  //   }
  // }

  const sendHandler = (message) => {
    sendMessage(message)
    return true
  }

  const getMessages = async (type) => {
    try {
      setLoading(true)
      const response = await handleRequest('GET', `/chats/${_id}`, {}, {}, true)
      if (response.status === 200) {
        // get just new messages
        if (type === 'refresh') {
          if (messages.length < response.data.messages.length) {
            const newMessages = response.data.messages.slice(messages.length)
            setMessages([...messages, ...newMessages])
          }
        } else {
          setMessages(response.data.messages)
        }
        setParticipants(response.data.participants)
      } else {
        setError('Error getting messages')
      }
    } catch (error) {
      setError('Error getting messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (_id) {
      getMessages('change')
    }
  }, [_id])

  const scrollToBottom = () => {
    const chatDisplay = document.getElementById('chatDisplay')
    chatDisplay.scrollTop = chatDisplay.scrollHeight
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div id={_id} className={`${styles.container} standard_border`}>
      <div className={`${styles.title_wrapper} font-bebas-neue`}>
        <div>
          Chat: <span style={{ marginLeft: '0.2rem' }}>{name}</span>
        </div>
        <div className={`${styles.participants} font-overpass-mono`}>
          <span style={{ marginRight: '0.4rem' }}>{participants?.length}</span>
          users 👥
        </div>
      </div>
      <div className={styles.display_wrapper}>
        <div id="chatDisplay" className={styles.messages_wrapper}>
          {messages?.length > 0 &&
            messages?.map((message, index) => {
              return (
                <ChatMessage
                  user={message.user}
                  text={message.message}
                  sent_at={message.sent_at}
                  actual_user_id={auth.user.id}
                />
              )
            })}
          {messages?.length === 0 && (
            <div className={styles.no_messages}>
              <div className={`${styles.no_messages_text} standard_border`}>
                There are no messages yet. <br /> Start the conversation!
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.input_wrapper}>
        <ChatInput handleSend={sendHandler} />
      </div>
    </div>
  )
}

export default Chat
