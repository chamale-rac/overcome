import React from 'react'
import * as styles from './EventsDashboard.module.css'

import { NewEvent } from '@features/creation'

const EventsDashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <NewEvent />
      </div>
    </div>
  )
}

export default EventsDashboard
