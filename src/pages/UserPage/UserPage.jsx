import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './UserPage.module.css'
import { authStore } from '@context'
import { Events } from '@features/render'

const UserPage = ({ isCreator = true, user_id = null }) => {
  const { auth } = authStore
  const navigate = useNavigate()
  const { creator_id } = useParams()
  const { handleRequest } = useApi()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [friendResponse, setFriendResponse] = useState(null)

  useEffect(() => {
    console.log('theUSER', user)
  }, [user])

  const sendFriendRequest = async () => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'post',
        `/relations/friendRequest`,
        {
          first_user_id: auth.user.id,
          second_user_id: user_id,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
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
    }
  }

  const handleSendFriendRequest = () => {
    sendFriendRequest()
  }

  const getUserDetails = async (_id) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'GET',
        `/users/${_id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      console.log(response.data)
      setUser(response.data)
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
    console.log('isCreator', isCreator)
    if (!isCreator) {
      console.log('user_id', user_id)
      getUserDetails(user_id)
    } else {
      getUserDetails(creator_id)
    }
  }, [user_id])

  return (
    <div className={`${styles.container} standard_border`}>
      <div className={styles.profile_info_container}>
        {isCreator && (
          <NavButton
            type="normal"
            handleClick={() => navigate(-1)}
            customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base mb-20"
          >
            ⇐ Back
          </NavButton>
        )}
        {user && (
          <>
            <div className={styles.title_wrapper}>
              <div className={styles.flex}>
                <h2 className={`${styles.event_title} font-bebas-neue`}>
                  @{user?.username}
                </h2>
                <img
                  src="/public/profile-400.png"
                  alt="Foto de perfil de Juan"
                />
              </div>
            </div>

            <hr
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
                border: 'none',
                margin: '0px 0',
              }}
            />

            <div className={styles.profile_info}>
              <button
                className={styles.button}
                onClick={() => handleSendFriendRequest()}
              >
                Send Friend Request 😎
              </button>
              <h3>
                Name: {user?.name} {user?.lastname}
              </h3>
              <h3>Email: {user?.email}</h3>
              <div className={styles.eventsContainer}>
                {!(user?.savedEvents === undefined) && (
                  <Events events={user?.savedEvents} inProfile={true} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserPage
