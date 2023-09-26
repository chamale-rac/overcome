import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat, Button, ControlledPopup } from '@components/global'
import * as styles from './UserPage.module.css'
import { authStore } from '@context'
import { Events } from '@features/render'

const UserPage = ({ isCreator = true, user_id = null }) => {
  const [openProfilePopup, setOpenProfilePopup] = useState(false)
  const closeProfilePopup = () => setOpenProfilePopup(false)
  const openProfilePopupFunction = () => setOpenProfilePopup(true)

  const { auth } = authStore
  const navigate = useNavigate()
  const { creator_id } = useParams()
  const { handleRequest } = useApi()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [friendStatus, setFriendStatus] = useState(null)

  const [friendResponse, setFriendResponse] = useState(null)

  useEffect(() => {
    /* console.log('theUSER', user)*/
  }, [user])

  const checkFriendStatus = async () => {
    try {
      const response = await handleRequest(
        'POST',
        `/relations/friendStatus`,
        {
          id: auth.user.id,
          friend_id: user_id || creator_id,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log('CHECK FRIEND', response.data)*/
      setFriendStatus(response.data.isFriend)
    } catch (error) {
      console.error('CHECK ERROR', error)
      setError(
        'Error sending friend request, please try again later or contact support',
      )
    }
  }

  const sendFriendRequest = async () => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'post',
        `/relations/friendRequest`,
        {
          first_user_id: auth.user.id,
          second_user_id: user_id || creator_id,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log(response.data)*/
      setFriendResponse(response.data)
      checkFriendStatus()
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
      /* console.log(response.data)*/
      setUser(response.data)
      checkFriendStatus()
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
    /* console.log('isCreator', isCreator)*/
    if (!isCreator) {
      /* console.log('user_id', user_id)*/
      getUserDetails(user_id)
    } else {
      getUserDetails(creator_id)
    }
  }, [user_id])

  return (
    <div className={`${styles.container} standard_border`}>
      <ControlledPopup
        title={'Enviar solicitud'}
        isOpen={openProfilePopup}
        closeFunction={closeProfilePopup}
      >
        ¿Estas seguro de enviar una solicitud de amistad de{' '}
        <span style={{ fontWeight: 'bold' }}>{user?.username}</span>?
        <div className={styles.buttonsContainer}>
          <Button
            customStyles="mb-1 mt-3 mr-2"
            type="secondary"
            onClick={() => setOpenProfilePopup((o) => !o)}
          >
            Cancelar ❌
          </Button>
          <Button
            customStyles="mb-1 mt-3 ml-2"
            type="tertiary"
            onClick={() => {
              setOpenProfilePopup((o) => !o)
              handleSendFriendRequest()
            }}
          >
            Aceptar 🗝️
          </Button>
        </div>
      </ControlledPopup>

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
                <img
                  src={user.profilePicture ?? '/profile-400.png'}
                  alt="Foto de perfil de Juan"
                />
                <h2 className={`${styles.event_title} font-bebas-neue`}>
                  @{user?.username} {user?._id === auth.user.id && '(You)'}
                </h2>
                <div className={styles.buttonWrapper}>
                  {user?._id === auth.user.id ? (
                    <Button type="primary" disabled customStyles="text-xs">
                      Recursive Friend Request 😎
                    </Button>
                  ) : (
                    <Button
                      type="secondary"
                      customStyles="text-xs"
                      onClick={openProfilePopupFunction}
                      disabled={friendStatus !== false}
                    >
                      {!friendStatus && 'Send Friend Request ✉️'}
                      {friendStatus &&
                        friendStatus != 'pending' &&
                        friendStatus != 'requested' &&
                        'Already your friend!'}
                      {friendStatus == 'pending' && 'Pending response'}
                      {friendStatus == 'requested' && 'Solitude received'}
                    </Button>
                  )}
                </div>
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
              <h3>
                Name: {user?.name} {user?.lastname}
              </h3>
              <h3>Email: {user?.email}</h3>
              <div className={`${styles.eventsContainerOtherProfile}`}>
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
