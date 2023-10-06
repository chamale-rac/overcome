import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Report.module.css'
import { authStore } from '@context'
import { useApi } from '@hooks'

function Report({
  whatIsGoingOn,
  creator,
  comment,
  _id,
  name,
  eventId,
  creator_id,
//   hour,
//   date,
}) {
  const { handleRequest } = useApi()
  const { auth } = authStore

  const convertToStandard = (militaryTime) => {
    const [hoursS, minutes] = hour.split(':')
    var hours = parseInt(hoursS)

    var amOrPm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12
    const time = hours + ':' + minutes + ' ' + amOrPm
    return time
  }

  const deleteEvent = async () => {
    try {
      console.log('eventId :>> ', eventId);
      const response = await handleRequest(
        'DELETE',
        `/events/${eventId}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
    } catch (error) {
      console.log('error :>> ', error);
    };
  };

  const closeReport = async () => {
    try {
      
    } catch (error) {
      console.log('error :>> ', error);
    };
  };


  const navigate = useNavigate()
  return (
    <>
      <div
        className={styles.container}
        style={{ margin: '' }}
      >
        <div className={`${styles.header} `}>
          <h1 className={`${styles.header} ${styles.title} font-space-grotesk `}>
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
          <p className={styles.creator}>
              {whatIsGoingOn}
          </p>
          <p className={styles.creator}>
              {comment}
          </p>
        </div>

        <h2 className={`${styles.header} ${styles.hour}  font-space-grotesk `}>
          {/* {convertToStandard(hour)} */}
        </h2>
        <div className={styles.details}>
          {/* <p className={styles.date}>{date}</p> */}
        </div>

        <div className={`${styles.flex} ${styles.actions} `}>
          <button
              className={`${styles.saveButton} button asap`}
              onClick={() => deleteEvent()}
          >
              Delete Event 💾
          </button>
          <button
              className={`${styles.saveButton} button asap`}
              onClick={() => closeReport()}
          >
              Close ❌
          </button>
        </div>
      </div>
    </>
  )
}

export default Report
