import React from 'react'
import styles from './ClockLoader.module.css'

const ClockLoader = ({ fontSize = 1.2 }) => {
  return (
    <div
      className={styles.loader}
      style={{
        fontSize,
      }}
    ></div>
  )
}

export default ClockLoader
