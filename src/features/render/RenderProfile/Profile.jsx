import { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { authStore } from '@context'
import { Events } from '@features/render'
import * as styles from './Profile.module.css'

function Profile() {
  const { handleRequest } = useApi()
  const [user, setUser] = useState({})
  const [userid, setUserid] = useState({})
  const [users, setUsers] = useState([])
  const { auth } = authStore

  const getUsers = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest('GET', '/users/', {}, 
      {
        'Authorization': 'Bearer ' + auth.authToken
      },
      true)
    console.log('USERS!', response)
    setUsers(response.data)
  }

  const getUser = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    console.log('testttt' ,auth.user.id)
    const response = await handleRequest('GET', `/users/${auth.user.id}`, {}, 
      {
        'Authorization': 'Bearer ' + auth.authToken
      },
      true)
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
    }
    )
  }, [auth])

  useEffect(() => {
    console.log('Var userid',userid)
  }, [userid])

  useEffect(() => {
    console.log(users)
  }, [users])

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <section className={styles.custom_section}>
        <div className={styles.main_info}>
          <img src="/public/profile-400.png" alt="Foto de perfil de Juan" />
          <h3>{user.name} {user.lastname}</h3>
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
        <div className={styles.eventsContainer} >
          {
            !(user.savedEvents===undefined) && (
              <Events events={user.savedEvents} />
            )
          }

        </div>
        {/* <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul> */}
        
      </section>
      {/* <section className={`${styles.custom_section} ${styles.sub_section}`}> */}
        <h2>Mis amigos</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      {/* </section> */}
    </div>
  )
}

export default Profile
