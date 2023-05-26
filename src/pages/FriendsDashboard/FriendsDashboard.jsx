import React, { useState, useEffect } from 'react'
import { Collapse, Chat } from '@components/global'
import { useApi } from '@hooks'

import { authStore } from '@context'
import { UserPage } from '@pages'
import * as styles from './FriendsDashboard.module.css'
import { SearchInput, UserList } from '@components/global'

const FriendsDashboard = () => {
  const { auth } = authStore

  const { handleRequest } = useApi()
  const [allUsers, setAllUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [actualView, setActualView] = useState(null)
  const [userRelations, setUserRelations] = useState(null)
  const [friendRequests, setFriendRequests] = useState(null)
  const [friends, setFriends] = useState(null)
  const [friendResponse, setFriendResponse] = useState(null)

  const acceptFriendRequest = async (user_id) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'post',
        `/userRelations/acceptFriendRequest`,
        {
          accepter_user_id: auth.user.id,
          requester_user_id: user_id,
        },
        {},
        true,
      )
      console.log(response.data)
      setFriendResponse(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error sending friend request, please try again later or contact support',
      )
    } finally {
      setLoading(false)
      getUserRelations()
    }
  }

  const handleAcceptFriendRequest = (user_id) => {
    acceptFriendRequest(user_id)
  }

  const handleSetViewProfile = (user_id) => {
    setActualView({
      type: 'profile',
      user_id,
    })
  }
  const filterFriendRequests = () => {
    const requests = userRelations.filter(
      (relation) =>
        relation.user2._id === auth.user.id &&
        relation.second_user_agreement === false,
    )
    setFriendRequests(requests)
    console.log('friendRequests', friendRequests)
  }

  const handleSetViewChat = (chat_id, name) => {
    setActualView({
      type: 'chat',
      chat_id,
      name,
    })
  }

  const filterFriends = () => {
    const friends = userRelations.filter(
      (relation) =>
        (relation.user1._id === auth.user.id ||
          relation.user2._id === auth.user.id) &&
        relation.second_user_agreement === true &&
        relation.first_user_agreement === true,
    )
    setFriends(friends)
    console.log('friends', friends)
  }

  const getUserRelations = async () => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'GET',
        `/userRelations`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      console.log(response.data)
      setUserRelations(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  // TODO get all users, and quit actual user
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
    if (userRelations) {
      filterFriendRequests()
      filterFriends()
    }
  }, [userRelations])

  useEffect(() => {
    getAllUsers()
    getUserRelations()
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
              {allUsers && (
                <UserList
                  users={allUsers}
                  onClickFunction={handleSetViewProfile}
                />
              )}
            </Collapse>
          </div>
          <div className={styles.collapse_wrapper}>
            <Collapse title="Friend List">
              {friends && (
                <UserList
                  users={friends}
                  onClickFunction={handleSetViewChat}
                  type="friends"
                  actualUser={auth.user.id}
                />
              )}
            </Collapse>
          </div>
          <div className={styles.collapse_wrapper}>
            <Collapse title="Friend Requests">
              {friendRequests && (
                <UserList
                  users={friendRequests}
                  onClickFunction={handleAcceptFriendRequest}
                  type="requests"
                />
              )}
            </Collapse>
          </div>
        </div>
        <div className={styles.chat_container}>
          {actualView && actualView.type === 'profile' && (
            <UserPage user_id={actualView.user_id} isCreator={false} />
          )}
          {actualView && actualView.type === 'chat' && (
            <Chat _id={actualView.chat_id} name={actualView.name} />
          )}
          {!actualView && (
            <div className={styles.chat_placeholder}>
              <h2 className={styles.chat_placeholder_title}>
                Select a user to chat with
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendsDashboard
