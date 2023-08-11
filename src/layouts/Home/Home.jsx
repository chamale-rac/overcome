import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '@layouts/Home/SideBar'
import * as styles from './Home.module.css'
import { notifications } from '@context'
import { useSnapshot } from 'valtio'

import { ControlledPopup, Button } from '@components/global'

// TODO basic layout, missing show and hide and mobile version

const Home = () => {
  const links = [
    {
      name: 'Home',
      path: '/home',
      icon: '🏠',
    },
    {
      name: 'Events',
      path: '/home/events',
      icon: '🎉',
    },
    {
      name: 'New event',
      path: '/home/newevent',
      icon: '📝',
    },
    {
      name: 'Users',
      path: '/home/users',
      icon: '👥',
    },
    {
      name: 'Profile',
      path: '/home/profile',
      icon: '🤖',
    },
    {
      name: 'News',
      path: '/',
      icon: '🔔',
    },
    {
      name: 'Sign out',
      path: '/',
      icon: '📤',
    },
  ]

  const config = {
    name: 'Home',
  }

  const snap = useSnapshot(notifications)

  return (
    <div className={styles.container}>
      <SideBar links={links} />
      <div className={styles.outlet}>
        <ControlledPopup
          title={'News 🔔'}
          isOpen={snap.isOpen}
          closeFunction={notifications.closeFunction}
          type="notification"
        ></ControlledPopup>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
