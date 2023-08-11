import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import { Events } from '@features/render'
import { Input, SearchInput, ClockLoader } from '@components/global'
import { Collapse } from '@components/global'

function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])
  const [preLoadedEvents, setPreLoadedEvents] = useState([])
  const { handleRequest } = useApi()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    getInitialEvents()
  }, [])

  const getInitialEvents = async () => {
    setLoading(true)
    const response = await handleRequest('GET', '/events', {}, {}, false)

    setTimeout(() => {
      setUserEvents(response.data)
      setPreLoadedEvents(response.data)
      setLoading(false)
    }, 1000)
  }

  const onClick = async () => {
    const tagArray = search
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '')

    if (
      tagArray.length > 1 ||
      (tagArray.length === 1 && tagArray[0] !== search.trim())
    ) {
      const tagsQueryParam = tagArray.join(',')
      var queryString = `/events/search?tags=${encodeURIComponent(
        tagsQueryParam,
      )}`
      if (startDate && endDate) {
        queryString += `&startDate=${encodeURIComponent(
          startDate,
        )}&endDate=${encodeURIComponent(endDate)}`
      }

      try {
        // Make the request using the constructed query string
        const response = await handleRequest('get', queryString)

        // Set the preLoadedEvent state with the response data
        setUserEvents(response.data)
      } catch (error) {
        /* console.log(error)*/
        // Handle error if necessary
      }
    } else {
      const titleQueryParam = search.trim()
      var queryString = `/events/search?title=${encodeURIComponent(
        titleQueryParam,
      )}`
      if (startDate && endDate) {
        queryString += `&startDate=${encodeURIComponent(
          startDate,
        )}&endDate=${encodeURIComponent(endDate)}`
      }

      try {
        // Make the request using the constructed query string
        const response = await handleRequest('get', queryString)

        // Set the preLoadedEvent state with the response data
        setUserEvents(response.data)
      } catch (error) {
        /* console.log(error)*/
        // Handle error if necessary
      }
    }
  }

  useEffect(() => {
    const tagArray = search
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '')
    setTags(tagArray)
    /* console.log('tagArray', tagArray)*/
  }, [search])

  /* console.log('userEvents', userEvents)*/

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h1>Community Events!</h1>
      </div>
      <div className={styles.search}>
        <SearchInput
          name={'search'}
          value={search}
          onChange={setSearch}
          onClick={onClick}
          placeholder={'Search...'}
          isDynamic={true}
          searchIcon={'🔍'}
        />
      </div>

      <div className={styles.inputTags}>
        {/* Display a message explaining how to use tags */}
        {tags.length <= 1 && (
          <div className={`.font-bebas-neue`}>
            Enter multiple tags separated by commas to search by tags.
          </div>
        )}
        {/* Render the tags if there are more than one */}
        {tags.length > 1 && (
          <>
            <div>Tags:</div>
            {tags.map((tag) => (
              <div className={`${styles.tag} .font-bebas-neue`} key={tag}>
                {tag}
              </div>
            ))}
          </>
        )}
      </div>

      <div className={styles.dateFilter}>
        <Input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          name="date"
          label="Start Date"
          type="date"
          required
        />

        <Input
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          name="date"
          label="End Date"
          type="date"
          required
        />
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
