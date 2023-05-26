import React, { useState, useEffect } from 'react'
import { Collapse } from '@components/global'
import { useApi } from '@hooks'

import { authStore } from '@context'
import * as styles from './FriendsDashboard.module.css'
import { SearchInput, UserList } from '@components/global'

const FriendsDashboard = () => {
  const { auth } = authStore

  const { handleRequest } = useApi()
  const [allUsers, setAllUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'GET',
        `/users`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      console.log(response.data)
      setAllUsers(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} font-bebas-neue`}>Friends Dashboard</h2>
      <div className={styles.content_container}>
        <div className={styles.wrapper}>
          <div className={styles.collapse_wrapper}>
            <Collapse title="Search Users" closed={true}>
              <div className={styles.search_container}>
                <SearchInput
                  name={'search'}
                  value={search}
                  onChange={setSearch}
                  placeholder={'Search...'}
                  isDynamic={true}
                  searchIcon={'🔍'}
                />
              </div>
              {allUsers && <UserList users={allUsers} />}
            </Collapse>
          </div>
          <div className={styles.collapse_wrapper}>
            <Collapse title="Friend List">
              <div>a</div>
              <div>b</div>
              <div>b</div>
            </Collapse>
          </div>
          <div className={styles.collapse_wrapper}>
            <Collapse title="Friend Requests">
              <div>a</div>
              <div>b</div>
              <div>b</div>
            </Collapse>
          </div>
        </div>
        <div className={styles.chat_container}>
          Here is where the chat will go
        </div>
      </div>
    </div>
  )
}

export default FriendsDashboard
