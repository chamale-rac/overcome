import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './ChatMessage.module.css'

const ChatMessage = ({
  user,
  text,
  sent_at,
  actual_user_id,
  color = '#35afeb',
}) => {
  const navigate = useNavigate()

  const sentAtDate = new Date(sent_at)
  const sentAtUtcMinusSix = sentAtDate.toLocaleString('en-US', {
    timeZone: 'America/Guatemala',
  })

  return (
    <div
      className={`${styles.container} ${
        user._id == actual_user_id ? styles.mine : ''
      } standard_border`}
    >
      <h4
        className={`${styles.user}  font-overpass-mono`}
        style={{
          color: user._id == actual_user_id ? '#000000' : '#000000',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/home/users/${user._id}`)}
      >
        {user.username}
      </h4>
      <p className={styles.text}>{text}</p>
      <div className={styles.sent_at}>{sentAtUtcMinusSix}</div>
    </div>
  )
}

export default ChatMessage
