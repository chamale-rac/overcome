import * as styles from './Event.module.css'

function Event({ name, people, hour, date, link }) {

  return (
      <div className={styles.container} >
        <h1>{name}</h1>
        <p>Hour: {hour}</p>
        <p>Date: {date}</p>
          <div>People: {people}</div>
        <a>{link}</a>
      </div>
  )
}

export default Event
