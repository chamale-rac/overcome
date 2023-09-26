import React, { useState } from 'react'
import * as styles from './Dropdown.module.css'

const Dropdown = ({
  options,
  selected,
  setSelected,
  customStyles = '',
  label,
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={`${styles.dropdown} ${customStyles}`}>
      <label htmlFor="dropdown" className="font-overpass-mono">
        {label}
      </label>
      <div
        onClick={(e) => {
          setIsActive(!isActive)
        }}
        className={styles.dropdown_btn}
      >
        {selected}
        <div>
          <span>{isActive ? '🔼' : '🔽'}</span>
        </div>
      </div>
      <div
        className={styles.dropdown_content}
        style={{ display: isActive ? 'block' : 'none' }}
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={(e) => {
              setSelected(e.target.textContent)
              setIsActive(!isActive)
            }}
            className={styles.item}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
