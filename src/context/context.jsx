/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [example, setExample] = useState()

  const globalExample = (param) => {
    setExample(param)
  }

  return (
    <AppContext.Provider
      value={{
        example,
        globalExample,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
