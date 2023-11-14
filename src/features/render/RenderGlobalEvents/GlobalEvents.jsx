import { useState, useEffect, useRef } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import { Events } from '@features/render'
import { Input, SearchInput, ClockLoader } from '@components/global'
import { Collapse } from '@components/global'
import SkeletonElement from '@components/skeletons/SkeletonElement'
import Shimmer from '@components/skeletons/Shimmer'
import SkeletonEventPreview from './SkeletonEventPreview/SkeletonEventPreview'

function GlobalEvents() {
  // TODO: Add error handling, and write neater code. This whole file is cursed.

  const [userEvents, setUserEvents] = useState([])
  const [preLoadedEvents, setPreLoadedEvents] = useState([])
  const { handleRequest } = useApi()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [tags, setTags] = useState([])

  //pagination states
  const [eventCount, setEventCount] = useState(0)
  const [pageNum, setPageNum] = useState(0)
  const [currentPage, setPage] = useState(0)
  // to scroll to top of page when page changes
  const searchbar = useRef(null)

  // To calculate pagination
  const eventsPerPage = 5
  const pages = 0

  useEffect(() => {
    getInitialEvents()
  }, [])

  useEffect(() => {
    getEventCount()
    createPagination()
  }, [userEvents])

  useEffect(() => {
    getInitialEvents()

    searchbar.current.scrollIntoView({ behavior: 'smooth' })
  }, [currentPage])

  const getEventCount = async () => {
    const response = await handleRequest('GET', '/events/count')
    setEventCount(response.data)
    if (eventCount < eventsPerPage) {
      // No need for pagination
      setPageNum(0)
    } else {
      // Round to the nearest positive integer to accomadate for all events
      setPageNum(Math.ceil(eventCount / eventsPerPage))
    }
  }
  var pagination = []
  const createPagination = () => {}

  const getInitialEvents = async () => {
    setUserEvents([])
    setLoading(true)
    const response = await handleRequest(
      'GET',
      `/events?limit=${eventsPerPage}&offset=${currentPage * eventsPerPage}`,
      {},
      {},
      false,
    )
    // ? error handling???
    //order by date (newest first)
    response.data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

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
  }, [search])

  for (let i = 0; i < pageNum; i++) {
    if (i === currentPage) {
      pagination.push(
        <button
          key={i}
          className={`${styles.currentPage}`}
          onClick={() => {
            setPage(i)
            // focus view to first event on page
          }}
        >
          Page {i + 1}
        </button>,
      )
    } else {
      pagination.push(
        <button
          key={i}
          className="page-button"
          onClick={() => {
            setPage(i)
            // focus view to first event on page
          }}
        >
          Page {i + 1}
        </button>,
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h1>Events</h1>
      </div>
      <div className={styles.search} ref={searchbar}>
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

      <div className={`${styles.dateFilter} font-space-grotesk`}>
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

      {userEvents.length > 0 ? (
        <div className={styles.eventsContainer}>
          <Events events={userEvents} />
        </div>
      ) : loading ? (
        <ul className={styles.skeletons_events_container}>
          <SkeletonEventPreview />
          <SkeletonEventPreview />
          <SkeletonEventPreview />
          <SkeletonEventPreview />
          <SkeletonEventPreview />
        </ul>
      ) : (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          No events found! 😔
        </div>
      )}
      <div className={styles.pagination}>{pageNum > 0 ? pagination : ''}</div>
    </div>
  )
}

export default GlobalEvents
