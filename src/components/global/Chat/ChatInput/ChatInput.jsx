import React, { useState } from 'react'
import * as styles from './ChatInput.module.css'

import { useApi } from '@hooks'

const ChatInput = ({ handleSend }) => {
  const [inputValue, setInputValue] = useState('')
  const { handleRequest } = useApi()
  const [handleError, setHandleError] = useState()
  const [handleSuccess, setHandleSuccess] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue.trim() !== '') {
      if (handleSend(inputValue)) {
        setInputValue('')
      }
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        disabled={inputValue.trim() === ''}
        className={`${styles.button} ${
          inputValue.trim() === '' ? styles.disabled : ''
        }`}
      >
        ➤
      </button>
    </form>
  )
}

export default ChatInput
