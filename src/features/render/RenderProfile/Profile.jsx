import * as styles from './Profile.module.css'
import { useApi } from '@hooks'
import React, { useState, useEffect } from 'react'
import { authStore } from '@context'

function Profile() {
  const { auth } = authStore
  const { handleRequest } = useApi()
  const [allUsers, setAllUsers] = useState(null)
  const getAllUsers = async () => {
    try {
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
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>
      <div>
        <h2>Users list</h2>
        <div>{allUsers && allUsers.map((user) => <p>{user.username}</p>)}</div>
      </div>
    </div>
  )
}

export default Profile
