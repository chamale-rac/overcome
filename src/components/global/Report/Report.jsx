import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Report.module.css'
import { authStore } from '@context'
import { useApi } from '@hooks'
import { Toaster, toast } from 'sonner'
import { ControlledPopup, Button } from '@components/global'

function Report({
  whatIsGoingOn,
  creator,
  comment,
  _id,
  name,
  eventId,
  creator_id,
  handleSuccess,
  //   hour,
  //   date,
}) {
  const [openDeletePopup, setOpenDeletePopup] = useState(false)
  const closeDeletePopup = () => setOpenDeletePopup(false)
  const openDeletePopupFunction = () => setOpenDeletePopup(true)

  const [openRemovePopup, setOpenRemovePopup] = useState(false)
  const closeRemovePopup = () => setOpenRemovePopup(false)
  const openRemovePopupFunction = () => setOpenRemovePopup(true)

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
      console.log('eventId :>> ', eventId)
      const response = await handleRequest(
        'DELETE',
        `/events/${eventId}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )

      toast.custom((t) => (
        <div className={styles.toast}>✅ Event deleted successfully!</div>
      ))
      // if status 200
      handleSuccess()
    } catch (error) {
      console.log('error :>> ', error)
      toast.custom((t) => (
        <div className={styles.toast}>❌ Error deleting event</div>
      ))
    }
  }

  const closeReport = async () => {
    try {
      const response = await handleRequest(
        'DELETE',
        `/reports/event/${_id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      toast.custom((t) => (
        <div className={styles.toast}>✅ Report closed successfully!</div>
      ))
      // if status 200
      handleSuccess()
    } catch (error) {
      console.log('error :>> ', error)
      toast.custom((t) => (
        <div className={styles.toast}>❌ Error closing report</div>
      ))
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <div className={styles.container} style={{ margin: '' }}>
        <div className={`${styles.header} `}>
          <h1
            className={`${styles.header} ${styles.title} font-space-grotesk `}
            onClick={() => navigate(`/home/events/${eventId}`)}
            style={{ cursor: 'pointer' }}
          >
            {name}
          </h1>
          <p className={styles.creator}>
            <strong>Reporter:</strong>{' '}
            <span
              style={{
                cursor: 'pointer',
                padding: '0',
                margin: '0',
                // underline
                textDecoration: 'underline',
              }}
              onClick={() => navigate(`/home/users/${creator_id}`)}
            >
              {creator}
            </span>
          </p>
          <p className={styles.creator}>
            <strong>What is going on:</strong> {whatIsGoingOn}
          </p>
          <p className={styles.creator}>
            <strong>Comment:</strong>
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
            onClick={() => openDeletePopupFunction()}
          >
            Delete Event 💾
          </button>
          <button
            className={`${styles.saveButton} button asap`}
            onClick={() => openRemovePopupFunction()}
          >
            Close ❌
          </button>
        </div>
        <ControlledPopup
          title={'Eliminar evento'}
          isOpen={openDeletePopup}
          closeFunction={closeDeletePopup}
        >
          ¿Estas seguro de eliminar el evento{' '}
          <span style={{ fontWeight: 'bold' }}>{name}</span>?
          <div className={styles.buttonsContainer}>
            <Button
              customStyles="mb-1 mt-3 mr-2"
              type="secondary"
              onClick={() => setOpenDeletePopup((o) => !o)}
            >
              Cancelar ❌
            </Button>
            <Button
              customStyles="mb-1 mt-3 ml-2"
              type="tertiary"
              onClick={() => {
                setOpenDeletePopup((o) => !o)
                deleteEvent()
              }}
            >
              Aceptar 🗝️
            </Button>
          </div>
        </ControlledPopup>

        <ControlledPopup
          title={'Cerrar reporte'}
          isOpen={openRemovePopup}
          closeFunction={closeRemovePopup}
        >
          ¿Estas seguro de cerrar el reporte de{' '}
          <span style={{ fontWeight: 'bold' }}>{name}</span>?
          <div className={styles.buttonsContainer}>
            <Button
              customStyles="mb-1 mt-3 mr-2"
              type="secondary"
              onClick={() => setOpenRemovePopup((o) => !o)}
            >
              Cancelar ❌
            </Button>
            <Button
              customStyles="mb-1 mt-3 ml-2"
              type="tertiary"
              onClick={() => {
                setOpenRemovePopup((o) => !o)
                closeReport()
              }}
            >
              Aceptar 🗝️
            </Button>
          </div>
        </ControlledPopup>
      </div>
    </>
  )
}

export default Report
