import React from 'react'
import * as styles from './UserList.module.css'
import { useNavigate } from 'react-router-dom'

const UserList = ({
  users,
  onClickFunction,
  type = 'users',
  actualUser = '',
}) => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.messages_container} standard_border`}>
      {type === 'users' &&
        users?.map((user) => (
          <div
            className={styles.user_container}
            onClick={() => onClickFunction(user._id)}
          >
            {user.username}{' '}
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.4',
              }}
            >
              (Click to view profile)
            </span>
          </div>
        ))}

      {type === 'requests' &&
        users?.map((relation) => (
          <div
            className={styles.user_container}
            onClick={() => onClickFunction(relation.user1._id)}
          >
            {relation.user1.username}{' '}
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.5',
              }}
            >
              (Click to accept)
            </span>
          </div>
        ))}

      {type === 'friends' &&
        users?.map((relation) => (
          <div
            className={styles.user_container}
            onClick={() =>
              onClickFunction(
                relation.chat_id,
                actualUser === relation.user1._id
                  ? relation.user2.username
                  : relation.user1.username,
              )
            }
          >
            {actualUser === relation.user1._id
              ? relation.user2.username
              : relation.user1.username}{' '}
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.5',
              }}
            >
              (Click to chat)
            </span>
          </div>
        ))}

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
