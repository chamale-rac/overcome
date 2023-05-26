import React from 'react'
import * as styles from './UserList.module.css'
import { useNavigate } from 'react-router-dom'

const UserList = ({ users, onClickFunction, type = 'users' }) => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.messages_container} standard_border`}>
      {type === 'users' &&
        users?.map((user) => (
          <div
            className={styles.user_container}
            onClick={() => onClickFunction(user._id)}
          >
            {user.username}
          </div>
        ))}
      {type === 'friends' ||
        (type === 'requests' &&
          users?.map((relation) => (
            <div
              className={styles.user_container}
              onClick={() => onClickFunction(relation.user1._id)}
            >
              {relation.user1.username}
            </div>
          )))}

      {!users ||
        (users.length === 0 && (
          <div className={styles.user_container}>
            You don't have any {type} yet
          </div>
        ))}
    </div>
  )
}

export default UserList
