import React, { useState } from 'react'
import * as styles from './SideBar.module.css'

import { useNavigate } from 'react-router-dom'

const SideBar = ({ links }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState(links[0].path)

  return (
    <div className={styles.container}>
      <img
        src="/icon.svg"
        alt="logo"
        className="w-12 h-12 object-contain mb-4"
      />
      <div className={styles.links}>
        {links.map((link) => {
          return (
            <div
              className={`${styles.link} ${
                active === link.path ? styles.active : ''
              }`}
            >
              <button
                onClick={() => {
                  navigate(link.path)
                  setActive(link.path)
                }}
              >
                <span>{link.icon}</span>
                <span className={`${styles.text} font-bebas-neue`}>
                  {link.name}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
