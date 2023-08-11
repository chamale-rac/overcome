import React from 'react'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import * as styles from './ControlledPopup.module.css'

import { notifications } from '@context'
import { useSnapshot } from 'valtio'

const ControlledPopup = ({
  children,
  title,
  isOpen,
  closeFunction,
  type = 'notification',
}) => {
  const snap = useSnapshot(notifications)
  return (
    <div>
      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={() =>
          type === 'notification'
            ? (notifications.isOpen = false)
            : closeFunction()
        }
        modal
      >
        <div className={styles.modal}>
          <a
            className={styles.close}
            onClick={() =>
              type === 'notification'
                ? (notifications.isOpen = false)
                : closeFunction()
            }
          >
            ❌
          </a>
          <div className={styles.header}> {title}</div>
          <div className={styles.content}>{children}</div>
        </div>
      </Popup>
    </div>
  )
}

ControlledPopup.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  controlFunction: PropTypes.func.isRequired,
  closeFunction: PropTypes.func.isRequired,
}

export default ControlledPopup
