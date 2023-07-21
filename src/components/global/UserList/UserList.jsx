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
          <div className={styles.user_container}>
            {user.username}
            <button
              className="button asap"
              onClick={() => onClickFunction(user._id)}
              style={{
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '10px',
              }}
            >
              Info
            </button>
            {/**            
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.4',
                marginLeft: '0.2rem',
              }}
            >
              (Click to view profile)
            </span>
             */}
          </div>
        ))}

      {type === 'requests' &&
        users?.map((relation) => (
          <div
            className={styles.user_container}
            onClick={() => onClickFunction(relation.user._id)}
          >
            {relation.user.username}{' '}
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.5',
                marginLeft: '0.2rem',
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
              onClickFunction(relation.chat_id, relation.user.username)
            }
          >
            {relation.user.username}
            {''}
            <span
              style={{
                fontSize: '0.8rem',
                color: '#00000',
                opacity: '0.5',
                marginLeft: '0.2rem',
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
