import React, { useState, useEffect } from 'react'
import { Collapse, Chat, NavButton } from '@components/global'
import { useApi } from '@hooks'
import { useParams } from 'react-router-dom'
import { dashStore, OpenChat } from '@context'
import { useSnapshot } from 'valtio'

import { authStore } from '@context'
import { UserPage } from '@pages'
import * as styles from './FriendsDashboard.module.css'
import { SearchInput, UserList } from '@components/global'

const FriendsDashboard = () => {
  const { auth } = authStore
  const { data } = dashStore
  const snap = useSnapshot(dashStore)
  const snapOpenChat = useSnapshot(OpenChat)

  const { handleRequest } = useApi()
  const [allUsers, setAllUsers] = useState(null)
  const [allPreLoadedUsers, setAllPreLoadedUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [actualView, setActualView] = useState(null)
  const [userRelations, setUserRelations] = useState(null)
  const [friendRequests, setFriendRequests] = useState(null)
  const [friends, setFriends] = useState(null)
  const [friendResponse, setFriendResponse] = useState(null)

  // New version variables
  const [relationsFriends, setRelationsFriends] = useState(null)

  const removeFriend = (user_id) => {
    handleRemoveFriend(user_id)
  }

  const handleRemoveFriend = async (user_id) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'POST',
        `/relations/removeFriend`,
        {
          first_user_id: auth.user.id,
          second_user_id: user_id,
        },
        {},
        false,
      )
      setFriendResponse(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error sending friend request, please try again later or contact support',
      )
      setLoading(false)
    }
  }

  const handleGetUserRelations = () => {
    getFriends()
  }

  const handleSetViewChat = (chat_id, name) => {
    setActualView({
      type: 'chat',
      chat_id,
      name,
    })
  }

  const getFriends = async () => {
    try {
      const friendsResponse = await handleRequest(
        'GET',
        `/relations/friends/${auth.user.id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log('friendResponse LISt', friendsResponse.data)*/
      setRelationsFriends(friendsResponse.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching friends, please try again later or contact support',
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
      /* console.log(response.data)*/
      setAllUsers(response.data)
      setAllPreLoadedUsers(response.data)
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
    handleGetUserRelations()
  }, [])

  useEffect(() => {
    if (search === '') {
      setAllUsers(allPreLoadedUsers)
    } else {
      const usersFiltered = allUsers.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase())
      })
      setAllUsers(usersFiltered)
    }
  }, [search])

  useEffect(() => {
    if (snapOpenChat.isOpen) {
      setActualView({
        type: 'chat',
        chat_id: snapOpenChat.chat_id,
        name: snapOpenChat.name,
      })
      OpenChat.isOpen = false
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} font-bebas-neue`}>Friends Dashboard</h2>
      <div className={styles.content_container}>
        <div className={styles.wrapper_list}>
          <Collapse title="Friend List" closed={false}>
            {relationsFriends && (
              <UserList
                users={relationsFriends}
                onClickFunction={handleSetViewChat}
                secondOnClickFunction={removeFriend}
                type="friends"
                actualUser={auth.user.id}
              />
            )}
          </Collapse>
        </div>
        <div className={styles.chat_container}>
          {actualView && actualView.type === 'profile' && (
            <UserPage user_id={actualView.user_id} isCreator={false} />
          )}
          {actualView && actualView.type === 'chat' && (
            <Chat _id={actualView.chat_id} name={actualView.name} />
          )}
          {!actualView && (
            <div className={styles.dummy_chat}>Select a user to chat with</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendsDashboard
