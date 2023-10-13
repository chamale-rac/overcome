import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '@layouts/Home/SideBar'
import * as styles from './Home.module.css'
import { notifications, modal, authStore, OpenChat } from '@context'
import { useSnapshot } from 'valtio'
import { useApi } from '@hooks'

import { ControlledPopup, UserNotification } from '@components/global'
import { useNavigate } from 'react-router-dom'

// TODO basic layout, missing show and hide and mobile version

const Home = () => {
  const navigate = useNavigate()
  const { handleRequest } = useApi()
  const { auth } = authStore
  const isAdmin = (auth.user.roles?.Admin ?? 0) === 1

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
      name: 'Reports',
      path: '/home/reports',
      icon: '🗂️',
      hidden: !isAdmin,
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
      path: '/.',
      icon: '🔔',
    },
    {
      name: 'Sign out',
      path: '/',
      icon: '📤',
    },
    {
      name: 'Theme',
      path: '/p',
      icon: '🎨',
    },
  ]

  const config = {
    name: 'Home',
  }

  const snap = useSnapshot(notifications)
  const [userNotifications, setUserNotifications] = useState(null)

  const themeSnap = useSnapshot(modal)

  const getNotifications = async () => {
    try {
      const response = await handleRequest(
        'GET',
        `/users/getNotifications/${auth.user.id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      notifications.unreadCount = response.data.unreadCount
      setUserNotifications(response.data.notifications)
    } catch (error) {
      /* console.log(error)*/
    }
  }

  const [updating, setUpdating] = useState(false)

  const updateNotifications = async () => {
    userNotifications.forEach((notification) => {
      notification.read = true
    })
    setUpdating(true)
    try {
      const response = await handleRequest(
        'POST',
        `/users/updateNotifications/${auth.user.id}`,
        {
          notifications: userNotifications,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      getNotifications()
    } catch (error) {
      /* console.log(error)*/
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    if (!snap.isOpen && !updating) {
      const interval = setInterval(() => {
        getNotifications()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [snap.isOpen, updating])

  const handleShowOff = (_id) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification._id === _id
          ? { ...notification, show: false }
          : notification,
      ),
    )
  }

  const closeFunction = () => {
    notifications.isOpen = false
    updateNotifications()
  }
  const closeThemeFunction = () => {
    modal.isOpen = false
  }

  const goTo = (notification) => {
    notifications.isOpen = false
    if (notification.type === 'chat_event') {
      navigate(`/home/events/${notification.event_id}`)
    } else {
      // go to users
      OpenChat.chat_id = notification.chat_id
      OpenChat.name = notification.username
      OpenChat.isOpen = true
      navigate(`/home/users`)
    }
  }
  useEffect(() => {
    // Retrieve the selected theme from local storage
    const savedTheme = localStorage.getItem('selectedTheme')

    // If a theme was previously saved in local storage, apply it
    if (savedTheme) {
      changeTheme(savedTheme)
    }

    getNotifications()
  }, [])

  const changeTheme = (theme) => {
    modal.isOpen = false
    console.log(theme)

    // Access the root element of the document
    const root = document.documentElement

    switch (theme) {
      case 'Hipster':
        root.style.setProperty('--ink-background-dark', '#bda1da')
        root.style.setProperty('--ink-background-highlight', '#c9ffc5')
        root.style.setProperty('--ink-background-messages', '#a8ffc5')
        root.style.setProperty('--ink-background-chat', '#bda1da')
        break
      case 'Original':
      default:
        root.style.setProperty('--ink-background-dark', '#daf5f0')
        root.style.setProperty('--ink-background-highlight', '#cdd57e')
        root.style.setProperty('--ink-background-light', 'transparent')
        root.style.setProperty('--ink-background-messages', '#daf5f0')
        root.style.setProperty('--ink-background-chat', '#e7e4e4')
        break
    }

    localStorage.setItem('selectedTheme', theme)
  }

  return (
    <div className={styles.container}>
      <SideBar links={links} />
      <div className={styles.outlet}>
        <ControlledPopup
          title={'Theme 🎨'}
          isOpen={themeSnap.isOpen}
          closeFunction={closeThemeFunction}
          type="notification"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: '20px',
              fontSize: '20px',
            }}
          >
            <div className={styles.themes}>
              <ul>
                <li>
                  <button onClick={(e) => changeTheme('Original')}>
                    Original
                  </button>
                </li>

                <li>
                  <button onClick={(e) => changeTheme('Hipster')}>
                    Hipster
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </ControlledPopup>

        <ControlledPopup
          title={'Notifications 🔔'}
          isOpen={snap.isOpen}
          closeFunction={closeFunction}
          type="notification"
        >
          {userNotifications != null && userNotifications?.length != 0 ? (
            <div
              style={{
                minHeight: '350px',
                maxHeight: '500px',
                width: '500px',
                overflowY: 'scroll',
              }}
              className={styles.popupInsider}
            >
              {userNotifications
                .filter((notification) => notification.show)
                .map((notification) => (
                  <UserNotification
                    key={notification._id}
                    notification={notification}
                    quit={() => handleShowOff(notification._id)}
                    closeFunction={closeFunction}
                    goto={() => goTo(notification)}
                    type={notification.type}
                  />
                ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '20px',
                fontSize: '15px',
              }}
            >
              <h3>Nothing to show here! 🚫</h3>
            </div>
          )}
        </ControlledPopup>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
