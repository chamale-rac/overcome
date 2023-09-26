import { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { authStore } from '@context'
import { Events } from '@features/render'
import { ImageCustomizer } from '@features/creation'
import { ControlledPopup, ClockLoader } from '@components/global'
import * as styles from './Profile.module.css'
import { image } from '@context'
import EditProfile from '../../creation/EditProfile/EditProfile'

function Profile() {
  const [error, setError] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  const { handleRequest } = useApi()
  const [user, setUser] = useState({})
  const [userid, setUserid] = useState({})
  const [users, setUsers] = useState([])

  const [openProfilePopup, setOpenProfilePopup] = useState(false)
  const [openInfoPopup, setOpenInfoPopup] = useState(false)
  const closeProfilePopup = () => setOpenProfilePopup(false)
  const closeInfoPopup = () => setOpenInfoPopup(false)

  const { auth } = authStore

  const editProfile = async (newImage) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'POST',
        `/users/editInfo/${auth.user.id}`,
        {
          profilePicture: newImage,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log(response.data)*/
      // add just a new field or update the profilePicture field
      setUser({ ...user, profilePicture: newImage })
      image.result = ''
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSaveImage = (newImage) => {
    /* console.log('is saving')*/
    editProfile(newImage)
  }

  const getUsers = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'GET',
      '/users/',
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    /* console.log('USERS!', response)*/
    setUsers(response.data)
  }

  const getUser = async () => {
    setProfileLoading(true)
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    /* console.log('testttt', auth.user.id)*/
    const response = await handleRequest(
      'GET',
      `/users/${auth.user.id}`,
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    /* console.log('USER!!!', response)*/
    setUser(response.data)
    setProfileLoading(false)
  }

  useEffect(() => {
    /* console.log(auth)*/
    /* console.log(auth.user.username, auth.user.id)*/
    getUser()
    setUserid({
      username: auth.user.username,
      userid: auth.user.id,
    })
  }, [auth])

  useEffect(() => {
    console.log('Var user', user)
  }, [user])

  useEffect(() => {
    /* console.log(users)*/
  }, [users])

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={styles.container}>
      <ControlledPopup
        title={'🖼️ Profile Picture'}
        isOpen={openProfilePopup}
        closeFunction={closeProfilePopup}
      >
        {loading ? (
          <div className={styles.loading}>
            <ClockLoader fontSize="5" />
            <span>Updating profile picture...</span>
          </div>
        ) : (
          <ImageCustomizer
            actualImage={user.profilePicture ?? '/profile-400.png'}
            saveNewImage={handleSaveImage}
          />
        )}
      </ControlledPopup>
      <ControlledPopup
        title={'Profile Info'}
        isOpen={openInfoPopup}
        closeFunction={closeInfoPopup}
      >
        <EditProfile
          user={user}
          successAction={(values) => {
            setUser({
              ...user,
              ...values,
            })
            setOpenInfoPopup(false)
          }}
        />
      </ControlledPopup>
      <div className={styles.titleWrapper}>
        <h1>My profile</h1>
        <button
          type="button"
          onClick={() => {
            setOpenInfoPopup((o) => !o)
          }}
        >
          ✏️
        </button>
      </div>
      {!profileLoading ? (
        <>
          <section className={styles.custom_section}>
            <div className={styles.main_info}>
              <div className={styles.imageWrapper}>
                <img
                  src={user.profilePicture ?? '/profile-400.png'}
                  alt="Foto de perfil de Juan"
                />
                <button
                  type="button"
                  onClick={() => setOpenProfilePopup((o) => !o)}
                >
                  ✏️
                </button>
              </div>
              <h3>
                {`${user.name} ${user.lastname}`}
              </h3>
              <h4>@{user.username}</h4>
              <h5>Email: {user.email}</h5>
            </div>
          </section>
          <section className={`${styles.custom_section} ${styles.sub_section}`}>
            <h2>Joined Hooks</h2>
            <div className={styles.eventsContainer}>
              {!(user.savedEvents === undefined) && (
                <Events events={user.joinedEvents} inProfile={true} />
              )}
            </div>
            <h2>Saved Hooks</h2>
            <div className={styles.eventsContainer}>
              {!(user.savedEvents === undefined) && (
                <Events events={user.savedEvents} inProfile={true} />
              )}
            </div>
          </section>
        </>
      ) : (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          Loading... <ClockLoader fontSize={'3.8'} />
        </div>
      )}
    </div>
  )
}

export default Profile
