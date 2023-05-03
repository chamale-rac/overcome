import React, { useState } from 'react'
import styles from './Notification.module.css'

const Notification = ({ children, type, dismissable, customStyles }) => {
  const [show, setShow] = useState(true)

  if (!show) {
    return null
  }

  return (
    <div className={`${styles.notification} ${styles[type]} ${customStyles}`}>
      {dismissable ? <span onClick={() => setShow(false)}>&times;</span> : null}
      {children}
    </div>
  )
}

export default Notification
