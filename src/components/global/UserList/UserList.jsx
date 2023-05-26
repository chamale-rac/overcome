import React from 'react'
import * as styles from './UserList.module.css'
import { useNavigate } from 'react-router-dom'

const UserList = ({ users }) => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.messages_container} standard_border`}>
      {users?.map((user) => (
        <div
          className={styles.user_container}
          onClick={() => navigate(`/home/users/${user._id}`)}
        >
          {user.username}
        </div>
      ))}
    </div>
  )
}

export default UserList
