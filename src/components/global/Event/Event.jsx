import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Event.module.css'
import { authStore } from '@context'
import { useApi } from '@hooks'

function Event({
  name,
  people,
  hour,
  date,
  link,
  creator,
  url,
  _id,
  creator_id,
  inProfile = false,
  inOtherProfile = false,
}) {
  const { handleRequest } = useApi()
  const { auth } = authStore
  const [profileView, setProfileView] = useState(false)

  const [userEventStatus, setUserEventStatus] = useState(null)

  const checkUserEventStatus = async () => {
    try {
      const response = await handleRequest(
        'POST',
        `/users/checkEvent/${auth.user.id}`,
        {
          event_id: _id,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log('save', response.data.saved)*/
      setUserEventStatus(response.data.saved)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    }
  }

  const convertToStandard = (militaryTime) => {
    const [hoursS, minutes] = hour.split(':')
    var hours = parseInt(hoursS)

    var amOrPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    const time = hours + ':' + minutes + '' + amOrPm
    return time
  }

  // const response = await handleRequest('GET', '/users/saveEvent', {user_id: asdasd, event_id: asdasda},
  const saveEvent = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'POST',
      '/users/saveEvent',
      {
        user_id: auth.user.id,
        event_id: _id,
      },
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    checkUserEventStatus()
    // setUsers(response.data)
  }

  const removeEvent = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'POST',
      '/users/removeSavedEvent',
      {
        user_id: auth.user.id,
        event_id: _id,
      },
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    checkUserEventStatus()
  }

  useEffect(() => {
    setProfileView(inProfile)
  }, [auth])

  useEffect(() => {
    checkUserEventStatus()
  }, [])

  const navigate = useNavigate()
  return (
    <>
      {profileView ? (
        <div className={`${styles.profileEventContainer}`}>
          <div className={`${styles.flexContainer}`}>
            <h1 className={`${styles.headerInProfile} font-space-grotesk `}>
              {name}
            </h1>
            <span
              className={styles.crownContainer}
              style={{
                cursor: 'pointer',
                padding: '0',
                margin: '0',
              }}
              onClick={() => navigate(`/home/users/${creator_id}`)}
            >
              👑{creator}
            </span>
          </div>
          <h2 className={`${styles.hourInProfile}  font-space-grotesk `}>
            {convertToStandard(hour)}
          </h2>
          <label className={styles.date}>{date}</label>
          <div className={`${styles.details} ${styles.tagsInProfileContainer}`}>
            {
              // ! next time send tags as TAGS and not link
              link
                .replace('Tags: ', '')
                .split(',')
                .map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag.trim()}
                  </span>
                ))
            }
          </div>
          <div
            className={`${styles.flex} ${styles.actions} ${styles.buttonsContainerInProfile} `}
          >
            {userEventStatus !== null && (
              <>
                {/* {!inProfile && !userEventStatus && ( */}
                {!userEventStatus && (
                  <button
                    className={`${styles.saveButton} button asap`}
                    onClick={() => saveEvent()}
                  >
                    Save 💾
                  </button>
                )}
                {userEventStatus && (
                  <button
                    className={`${styles.saveButton} button asap`}
                    onClick={() => removeEvent()}
                  >
                    Unsave ❌
                  </button>
                )}
                <button
                  className={`button asap`}
                  onClick={() => navigate(`/home/events/${_id}`)}
                >
                  Details 📃
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={styles.container}
          style={{ margin: !inProfile === true ? '0px' : '' }}
        >
          <div className={`${styles.header} `}>
            <h1
              className={`${styles.header} ${styles.title} font-space-grotesk `}
            >
              {name}
            </h1>
            <p className={styles.creator}>
              <span
                style={{
                  cursor: 'pointer',
                  padding: '0',
                  margin: '0',
                }}
                onClick={() => navigate(`/home/users/${creator_id}`)}
              >
                👑{creator}
              </span>
            </p>
          </div>

          <h2 className={`${styles.header} ${styles.hour} font-space-grotesk `}>
            {convertToStandard(hour)}
          </h2>
          <div className={styles.details}>
            <p>
              {
                // ! next time send tags as TAGS and not link
                link
                  .replace('Tags: ', '')
                  .split(',')
                  .map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag.trim()}
                    </span>
                  ))
              }
            </p>
            <p className={styles.date}>{date}</p>
          </div>

          <div className={`${styles.flex} ${styles.actions} `}>
            {userEventStatus !== null && (
              <>
                {!inProfile && !userEventStatus && (
                  <button
                    className={`${styles.saveButton} button asap`}
                    onClick={() => saveEvent()}
                  >
                    Save 💾
                  </button>
                )}
                {/* {!inProfile && userEventStatus && ( */}
                {userEventStatus && (
                  <button
                    className={`${styles.saveButton} button asap`}
                    onClick={() => removeEvent()}
                  >
                    Unsave ❌
                  </button>
                )}
                <button
                  className={`button asap`}
                  onClick={() => navigate(`/home/events/${_id}`)}
                >
                  Join ➤
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Event
