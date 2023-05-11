import React, { useState } from 'react'
import * as styles from './SearchInput.module.css'

const SearchInput = ({
  name,
  value,
  onChange,
  placeholder,
  isDynamic = true,
  searchIcon = '🔍',
}) => {
  const [internalSearch, setInternalSearch] = useState(value)

  return (
    <div className={`${styles.searchInput} font-overpass-mono`}>
      {isDynamic && (
        <>
          <input
            id={name}
            name={name}
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder={placeholder}
          />
          <div
            className={styles.searchIcon}
            onClick={() => onChange(internalSearch)}
          >
            🔍
          </div>
        </>
      )}
      {!isDynamic && (
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default SearchInput
