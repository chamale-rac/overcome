import React from 'react'
import * as styles from './UserNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { dashStore } from '@context'

const UserNotification = ({ notification, quit, closeFunction }) => {
  const navigate = useNavigate()

  const { message, read, date, type, chat_id, user_id, event_id } = notification
  // Possible types = ['chat_private', 'chat_event', 'friend_request', 'friend_request_accepted']

  const handleDelete = () => {
    quit()
  }

  return (
    <div className={`${styles.notification} ${read ? '' : styles.unread}`}>
      <div>
        <div className={styles.message}>{message}</div>
        <div className={styles.date}>{new Date(date).toLocaleString()}</div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          ❌
        </button>
      </div>
    </div>
  )
}

export default UserNotification
