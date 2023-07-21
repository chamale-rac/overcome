import React from 'react'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import * as styles from './ControlledPopup.module.css'

const ControlledPopup = ({ children, title, isOpen, closeFunction }) => {
  return (
    <div>
      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={() => closeFunction()}
        modal
      >
        <div className={styles.modal}>
          <a className={styles.close} onClick={() => closeFunction()}>
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
