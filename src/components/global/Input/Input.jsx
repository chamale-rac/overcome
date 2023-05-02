import React from 'react'
import styles from './Input.module.css'

const Input = ({
  label,
  name,
  value,
  onChange,
  type,
  required,
  placeholder
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>
        <span>{label || name}{required ? '*' : ''}</span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  )
}

export default Input