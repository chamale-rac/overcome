import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import { Events } from '@features/render'
import { Input, SearchInput, ClockLoader } from '@components/global'

function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])
  const [preLoadedEvents, setPreLoadedEvents] = useState([])
  const { handleRequest } = useApi()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getInitialEvents()
  }, [])

  const getInitialEvents = async () => {
    // TODO deprimente, no hay error handling
    setLoading(true)
    const response = await handleRequest('GET', '/events', {}, {}, false)
    console.log('events!', response)

    setTimeout(() => {
      setUserEvents(response.data)
      setPreLoadedEvents(response.data)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (search === '') {
      setUserEvents(preLoadedEvents)
    } else {
      const filteredEvents = userEvents.filter((event) => {
        return event.title.toLowerCase().includes(search.toLowerCase())
      })
      setUserEvents(filteredEvents)
    }
  }, [search])

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h1>Community Events!</h1>
        <div className={styles.search}>
          <SearchInput
            name={'search'}
            value={search}
            onChange={setSearch}
            placeholder={'Search...'}
            isDynamic={false}
            searchIcon={'🔍'}
          />
        </div>
      </div>
      <h2>This are today's Hooks!</h2>
      {userEvents.length > 0 ? (
        <div className={styles.eventsContainer}>
          <Events events={userEvents} />
        </div>
      ) : loading ? (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          Loading... <ClockLoader fontSize={'3.8'} />
        </div>
      ) : (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          No events found! 😔
        </div>
      )}
    </div>
  )
}

export default GlobalEvents
