import React from 'react'
import { useSnapshot } from 'valtio'

import { session } from '@store'

const Button = ({ children, type, customStyles, handleClick }) => {
  const snap = useSnapshot(session)

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: 'transparent',
        color: 'black',
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-full button font-overpass-mono ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
