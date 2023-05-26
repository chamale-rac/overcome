import React from 'react'
import { Collapse } from '@components/global'

import * as styles from './FriendsDashboard.module.css'

const FriendsDashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} font-bebas-neue`}>Friends Dashboard</h2>
        <div className={styles.collapse_wrapper}>
          <Collapse title="Search Users" closed={false}>
            <div>a</div>
            <div>b</div>
            <div>b</div>
          </Collapse>
        </div>
        <div className={styles.collapse_wrapper}>
          <Collapse title="Friend List">
            <div>a</div>
            <div>b</div>
            <div>b</div>
          </Collapse>
        </div>
        <div className={styles.collapse_wrapper}>
          <Collapse title="Friend Requests">
            <div>a</div>
            <div>b</div>
            <div>b</div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default FriendsDashboard
