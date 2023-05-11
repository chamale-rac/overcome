import React from 'react'
import styles from './ClockLoader.module.css'

const ClockLoader = ({ fontSize = '1.2rem' }) => {
  return (
    <div
      className={styles.loader}
      style={{
        fontSize: `${fontSize}rem`,
      }}
    ></div>
  )
}

export default ClockLoader
