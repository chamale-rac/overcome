import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalEvents.module.css'
import Event from '@components/global/Event'

function findSimilarStrings(inputString, stringArray) {
  const similarStrings = [];
  for (let i = 0; i < stringArray.length; i++) {
    const currentString = stringArray[i].title;
    if (currentString.includes(inputString)) {
      similarStrings.push(stringArray[i]);
    }
  }
  return similarStrings;
}


function GlobalEvents() {
  const [userEvents, setUserEvents] = useState([])
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
    // console.log('data!', response)
    setUserEvents(response.data)
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
      <div className={styles.flexContainer} >
        <h1>Community Events!</h1>
        <SearchBar />
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
