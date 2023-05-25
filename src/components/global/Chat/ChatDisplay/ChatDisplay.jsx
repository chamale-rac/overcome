import React, { useEffect } from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'
import * as styles from './ChatDisplay.module.css'

const ChatDisplay = ({ messages, actual_user_id }) => {
  const scrollToBottom = () => {
    const chatDisplay = document.getElementById('chatDisplay')
    chatDisplay.scrollTop = chatDisplay.scrollHeight
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div id="chatDisplay" className={styles.container}>
      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={message}
            user={message.user}
            text={message.message}
            sent_at={message.sent_at}
            actual_user_id={actual_user_id}
          />
        )
      })}
    </div>
  )
}

export default ChatDisplay
