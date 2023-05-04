import * as styles from './UserEvents.module.css'
// import Event from '../../Components/Event'
import Event from '@components/global/Event'

function UserEvents() {

  return (
    <div className={styles.root} >
      <h1>Events</h1>
      <div className={styles.container} >
        <Event
          name="Call of duty"
          hour="11:23"
          people="Pablo, Andres, Samuel"
        />
        <Event
          name="League of Legends"
        />
        <Event
          name="Minecraft"
        />
        <Event 
          name="Chess"
        />
        <Event 
          name="FIFA"
        />
        <Event 
          name="Need for Speed"
        />
        <Event 
          name="Cuphead"
        />
        <Event 
          name="Spiderman PS4"
        />
      </div>
    </div>
  )
}

export default UserEvents
