import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '@layouts/Home/SideBar'
import * as styles from './Home.module.css'

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
      name: 'Profile',
      path: '/home/profile',
      icon: '🤖',
    },
  ]

  const config = {
    name: 'Home',
  }

  return (
    <div className={styles.container}>
      <SideBar links={links} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  )
}

export default Home