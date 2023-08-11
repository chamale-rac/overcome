import React from 'react'
import * as styles from './UserNotification.module.css'

const UserNotification = ({ notification }) => {
  const { message, read, date, show, type, user_id, chat_id, event_id } =
    notification

  return (
    <div className={styles.notification}>
      <div className={styles.message}>{message}</div>
      <div className={styles.read}>{read ? 'Read' : 'Unread'}</div>
      <div className={styles.date}>{new Date(date).toLocaleString()}</div>
      <div className={styles.show}>{show ? 'Shown' : 'Hidden'}</div>
      <div className={styles.type}>{type}</div>
      <div className={styles.user_id}>{user_id}</div>
      <div className={styles.chat_id}>{chat_id}</div>
      <div className={styles.event_id}>{event_id}</div>
    </div>
  )
}

export default UserNotification
