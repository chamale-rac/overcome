import { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { authStore } from '@context'
import { Events } from '@features/render'
import { ImageCustomizer } from '@features/creation'
import { ControlledPopup, ClockLoader } from '@components/global'
import * as styles from './Profile.module.css'
import { image } from '@context'

function Profile() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { handleRequest } = useApi()
  const [user, setUser] = useState({})
  const [userid, setUserid] = useState({})
  const [users, setUsers] = useState([])

  const [openProfilePopup, setOpenProfilePopup] = useState(false)
  const closeProfilePopup = () => setOpenProfilePopup(false)

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
      console.log(response.data)
      image.result = ''
      getUser()
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
    console.log('is saving')
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
    console.log('USERS!', response)
    setUsers(response.data)
  }

  const getUser = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    console.log('testttt', auth.user.id)
    const response = await handleRequest(
      'GET',
      `/users/${auth.user.id}`,
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    console.log('USER!!!', response)
    setUser(response.data)
  }

  useEffect(() => {
    console.log(auth)
    console.log(auth.user.username, auth.user.id)
    getUser()
    setUserid({
      username: auth.user.username,
      userid: auth.user.id,
    })
  }, [auth])

  useEffect(() => {
    console.log('Var userid', userid)
  }, [userid])

  useEffect(() => {
    console.log(users)
  }, [users])

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => setOpenProfilePopup((o) => !o)}>
        Controlled Popup
      </button>
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
      <h1>My profile</h1>
      <section className={styles.custom_section}>
        <div className={styles.main_info}>
          <img
            src={user.profilePicture ?? '/profile-400.png'}
            alt="Foto de perfil de Juan"
          />
          <h3>
            {user.name} {user.lastname}
          </h3>
          <h4>@{user.username}</h4>
          <h5>Email: {user.email}</h5>
        </div>
        {/* <p>
          ¡Hola! Tengo 22 años y me encanta el deporte. Me dedico a la
          enseñanza del yoga y me gusta mucho compartir mis conocimientos con
          otras personas.
        </p> */}
        {/* <p>
          {JSON.stringify( user.savedEvents)}
        </p> */}
      </section>
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Hooks guardados</h2>
        <div className={styles.eventsContainer}>
          {!(user.savedEvents === undefined) && (
            <Events events={user.savedEvents} inProfile={true} />
          )}
        </div>
        {/* <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul> */}
      </section>
      {/**
        
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Mis amigos</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      </section>
        

         */}
    </div>
  )
}

export default Profile
