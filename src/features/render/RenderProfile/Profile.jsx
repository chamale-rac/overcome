import { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { authStore } from '@context'
import * as styles from './Profile.module.css'

function Profile() {
  const { handleRequest } = useApi()
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

  useEffect(() => {
    console.log(auth)
    console.log(auth.user.username, auth.user.id)
  }, [auth])

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
          <h3>Juan Pérez</h3>
          <h4>@liebert1</h4>
        </div>
        <p>
          ¡Hola! Soy Juan, tengo 28 años y me encanta el deporte. Me dedico a la
          enseñanza del yoga y me gusta mucho compartir mis conocimientos con
          otras personas.
        </p>
      </section>
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Hooks guardados</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      </section>
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Mis juegos</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      </section>
    </div>
  )
}

export default Profile
