import React, { useState } from 'react'

import { notifications, modal } from '@context'
import * as styles from './SideBar.module.css'

import { useSnapshot } from 'valtio'
import { useNavigate } from 'react-router-dom'

const SideBar = ({ links }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState(links[0].path)
  const [isRetracted, setIsRetracted] = useState(false)

  const snap = useSnapshot(notifications)
  const theme = useSnapshot(modal)
  return (
    <div
      className={`${styles.container} ${isRetracted ? styles.retracted : ''} `}
    >
      <div className={styles.retract}>
        <div
          className={styles.retract_button}
          onClick={() => setIsRetracted((prev) => !prev)}
        >
          📌
        </div>
      </div>
      <img
        src="/icon.svg"
        alt="logo"
        className={`${styles.image} ${isRetracted ? styles.retracted : ''}`}
      />
      <div className={styles.links}>
        {links.map((link) => {
          // Determine whether the link is "News"
          const isNewsLink = link.name === 'News'

          const isThemeLink = link.name === 'Theme'

          // Define the CSS classes for the link based on its status
          const linkClasses = `${styles.link} ${
            active === link.path ? styles.active : ''
          }`

          // Define inline styles for margin-top if it's a "News" link
          const linkStyles = isNewsLink ? { marginTop: 'auto' } : {}

          // Click handler for "News" link
          const handleNewsLinkClick = () => {
            notifications.isOpen = !snap.isOpen
          }

          const handleThemeClick = () => {
            modal.isOpen = !theme.isOpen
          }

          // Click handler for other links
          const handleOtherLinkClick = () => {
            navigate(link.path)
            setActive(link.path)
          }

          return (
            <div className={linkClasses} style={linkStyles} key={link.path}>
              <button
                className={styles.custom_button}
                onClick={
                  isNewsLink
                    ? handleNewsLinkClick
                    : isThemeLink
                    ? handleThemeClick
                    : handleOtherLinkClick
                }
              >
                {isNewsLink && snap.unreadCount > 0 && (
                  <div className={styles.unread}>{snap.unreadCount}</div>
                )}
                <span>{link.icon}</span>
                <div
                  className={`${styles.text} ${
                    isRetracted ? styles.retracted : ''
                  } font-bebas-neue`}
                >
                  {link.name}
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
