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
  isTextArea = false,
  customStyles = '',
  resize = 'none',
  rows = 4,
  maxLength = 60,
  hasTags = false,
  delimiter = ',',
  disabled = false,
  containerCustomStyles = '',
}) => {
  return (
    <div className={`${styles.inputContainer} ${containerCustomStyles}`}>
      <label htmlFor={name}>
        <span className="font-overpass-mono">
          {label || name}
          {/*TODO consider adding * when required */}
          {required ? '' : ''}:
        </span>
        {isTextArea ? (
          // set not resizable and some custom height later
          <textarea
            rows={rows}
            wrap="hard"
            style={{
              resize: resize,
              cursor: disabled ? 'not-allowed' : 'auto',
            }}
            className={customStyles}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={
              disabled
                ? 'Disabled, first fill the other fields...'
                : placeholder
            }
            maxLength={maxLength}
            disabled={disabled}
          />
        ) : (
          <input
            className={customStyles}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              cursor: disabled ? 'not-allowed' : 'auto',
            }}
          />
        )}
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
      {!error && hasTags && typeof value === 'string' && value.length > 0 &&(
        <div className={styles.inputTags}>
          {value
            .split(delimiter)
            .filter((line) => line.trim() !== '') // filter out lines that are only whitespace
            .map((line) => (
              <div className={`${styles.tag} .font-bebas-neue`}>{line}</div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Input
