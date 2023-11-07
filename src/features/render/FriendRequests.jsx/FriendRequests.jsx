import React, { useState, useEffect } from 'react'
import { authStore } from '@context'
import { useApi } from '@hooks'
import { UserList } from '@components/global'

const FriendRequests = () => {
  const { handleRequest } = useApi()

  const { auth } = authStore

  const [relationsRequests, setRelationsRequests] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [friendResponse, setFriendResponse] = useState(null)

  const handleAcceptFriendRequest = (user_id) => {
    console.log('handleAcceptFriendRequest', user_id)
    postAcceptFriendRequest(user_id)
  }

  const handleGetUserRelations = () => {
    getFriendRequests()
  }

  useEffect(() => {
    handleGetUserRelations()
  }, [])

  const getFriendRequests = async () => {
    try {
      setLoading(true)
      /* console.log('getFriendRequests', auth.user.id)*/
      const requests = await handleRequest(
        'GET',
        `/relations/requests/${auth.user.id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )

      /* console.log('friendsRequestRespose', requests.data)*/
      setRelationsRequests(requests.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching friend requests, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  const postAcceptFriendRequest = async (user_id) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'post',
        `/relations/acceptFriendRequest`,
        {
          accepter_user_id: auth.user.id,
          requester_user_id: user_id,
        },
        {},
        true,
      )
      /* console.log(response.data)*/
      setFriendResponse(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error sending friend request, please try again later or contact support',
      )
    } finally {
      setLoading(false)
      handleGetUserRelations()
    }
  }

  return (
    relationsRequests && (
      <UserList
        users={relationsRequests}
        onClickFunction={handleAcceptFriendRequest}
        type="requests"
      />
    )
  )
}

export default FriendRequests
