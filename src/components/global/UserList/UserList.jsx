import React, { useState } from 'react'
import * as styles from './UserList.module.css'
import { useNavigate } from 'react-router-dom'
import { ControlledPopup, Button } from '@components/global'

//! find a better way to pass multiple functions and separate into more components
// ! not easy to read, separate into other components??? :|
const UserList = ({
  users,
  onClickFunction,
  secondOnClickFunction,
  type = 'users',
  actualUser = '',
}) => {
  const [openProfilePopup, setOpenProfilePopup] = useState(false)
  const closeProfilePopup = () => setOpenProfilePopup(false)

  const navigate = useNavigate()
  return (
    <div className={`${styles.messages_container}`}>
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
              📑 Info
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
            //onClick={() => onClickFunction(relation.user._id)}
          >
            {relation.user.username}{' '}
            <ControlledPopup
              title={'Aceptar solicitud'}
              isOpen={openProfilePopup}
              closeFunction={closeProfilePopup}
            >
              ¿Estas seguro de aceptar la solicitud de amistad de{' '}
              <span style={{ fontWeight: 'bold' }}>
                {relation.user.username}
              </span>
              ?
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
                    onClickFunction(relation.user._id)
                  }}
                >
                  Aceptar 🗝️
                </Button>
              </div>
            </ControlledPopup>
            <button
              className="button asap"
              onClick={() => setOpenProfilePopup((o) => !o)}
              style={{
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '10px',
              }}
            >
              ➕ Accept
            </button>
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
            <button
              className="button asap"
              onClick={() => secondOnClickFunction(relation.user._id)}
              style={{
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '10px',
              }}
            >
              🗑️
            </button>
            <button
              className="button asap"
              onClick={() =>
                onClickFunction(relation.chat_id, relation.user.username)
              }
              style={{
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '10px',
              }}
            >
              💬
            </button>
          </div>
        ))}

      {!users ||
        (users.length === 0 && (
          <div className={styles.user_container}>
            You don't have any {type} yet!
          </div>
        ))}
    </div>
  )
}

export default UserList
