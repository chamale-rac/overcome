import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import { Events } from '@features/render'
import { Input, SearchInput, ClockLoader } from '@components/global'

function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])
  const [preLoadedEvents, setPreLoadedEvents] = useState([])
  const { handleRequest } = useApi()
  const [searchInput, setSearchInput] = useState("")
  // const [searching, setSearching] = useState(false)

  useEffect(() => {
    getEvents()
    // setSearching(false)
  }, [])

  useEffect(() => {
    console.log(searchInput)
  }, [searchInput])

  const getEvents = async () => {
    const response = await handleRequest('GET', '/events', {}, {}, false)
    console.log('events!', response)

    setTimeout(() => {
      setUserEvents(response.data)
      setPreLoadedEvents(response.data)
      setLoading(false)
    }, 1000)
  }

  const getSearchInputValue = () => {
    if(document.getElementById('search-input').value != null){
      setSearchInput(document.getElementById('search-input').value)
    }
    console.log('changging')
  }

  const SearchBar = () => {
    const getSearchInputValue = () => {
      if(document.getElementById('search-input').value != null){
        setSearchInput(document.getElementById('search-input').value)
        // console.log('changging')
      }
    }

    return (
      <div className={styles.searchBarContainer} > 
        <div className={styles.searchBarOutline}>
          <input
            type="text"
            id="search-input"
            placeholder="Search Events"
            // name="s"
            onChange={() => getSearchInputValue()}
            // onClick={getSearchInputValue()}
            // onClick={setSearching(false)}
          />
          <button 
            type="submit"
            // onChange={}
          >
            Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h1>Community Events!</h1>
        <div className={styles.search}>
          <SearchInput
            name={'search'}
            value={search}
            onChange={setSearch}
            placeholder={'Buscar...'}
            isDynamic={false}
            searchIcon={'🔍'}
          />
        </div>
      </div>
      <h2>This are today's Hooks!</h2>
      <div className={styles.eventsContainer}>
        {
        userEvents.map((event) => (
          <Event
            name={event.title}
            hour={event.hour}
            date={event.date != undefined && event.date.substring(0, 10)}
            people={event.participants}
            link={
              event.tags != undefined &&
              "Tags: "+
              JSON.stringify(event.tags)
                .replace('[', '')
                .replace(']', '')
                .replace(/"/g, '')
                .replace(/,/g, ', ')
            }
          />
        ))
        }
      </div>
    </div>
  )
}

export default GlobalEvents
