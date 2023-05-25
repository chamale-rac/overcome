import React from 'react'
import * as styles from './ChatMessage.module.css'

const ChatMessage = ({
  user,
  text,
  sent_at,
  actual_user_id,
  color = '#35afeb',
}) => {
  const sentAtDate = new Date(sent_at)
  const sentAtUtcMinusSix = sentAtDate.toLocaleString('en-US', {
    timeZone: 'America/Guatemala',
  })

  return (
    <div
      className={`${styles.container} ${
        user._id == actual_user_id ? styles.mine : ''
      }`}
    >
      <h4
        className={`${styles.user}  font-overpass-mono`}
        style={{
          color: user._id == actual_user_id ? '#14ca9c' : '#35afeb',
        }}
      >
        {user.username}
      </h4>
      <p className={styles.text}>{text}</p>
      <div className={styles.sent_at}>{sentAtUtcMinusSix}</div>
    </div>
  )
}

export default ChatMessage
