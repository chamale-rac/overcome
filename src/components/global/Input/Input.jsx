import React from 'react'
import styles from './Input.module.css'

const Input = ({
  label,
  name,
  value,
  onChange,
  type,
  required,
  placeholder,
  error,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>
        <span className="font-overpass-mono">
          {label || name}
          {/*TODO consider adding * when required */}
          {required ? '' : ''}:
        </span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
      {error && (
        <div className={styles.inputAlert}>
          {error.split('\n').map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Input
