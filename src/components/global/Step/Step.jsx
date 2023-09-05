import React from 'react'
import * as styles from './Step.module.css'

const Step = ({
  stepNum,
  title,
  description = null,
  isDone,
  children,
  customStyles = '',
  opacity = true,
}) => {
  return (
    <>
      <div
        className={`${styles.step} ${
          isDone ? styles.done : ''
        } ${customStyles}`}
      >
        <div>{stepNum}</div>
        <h2>{title}</h2>
        {description && (
          <>
            <hr />
            <p>{description}</p>
          </>
        )}
      </div>
      <div
        className={styles.stepContent}
        style={{
          opacity: isDone && opacity ? 0.8 : 1,
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Step
