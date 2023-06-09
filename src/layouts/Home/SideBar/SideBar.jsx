import React, { useState } from 'react'
import * as styles from './SideBar.module.css'

import { useNavigate } from 'react-router-dom'

const SideBar = ({ links }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState(links[0].path)
  const [isRetracted, setIsRetracted] = useState(false)

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
          return (
            <div
              className={`${styles.link} ${
                active === link.path ? styles.active : ''
              }`}
              style={link.name==='Sign out'?{marginTop: 'auto'}:{}}
            >
              <button
                className={styles.custom_button}
                onClick={() => {
                  navigate(link.path)
                  setActive(link.path)
                }}
              >
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
