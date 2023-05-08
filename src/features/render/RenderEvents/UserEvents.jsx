import * as styles from './UserEvents.module.css'
import Event from '@components/global/Event'
import useRefreshToken from '@hooks/useRefreshToken'

function UserEvents() {
  const refresh = useRefreshToken()

  return (
    <div className={styles.root}>
      <h1>Events</h1>
      <button onClick={() => refresh()}>Refresh</button>
      <div className={styles.container}>
        <Event
          name="Call of duty"
          hour="11:23"
          people="Pablo, Andres, Samuel"
        />
        <Event name="League of Legends" />
        <Event name="Minecraft" />
        <Event name="Chess" />
        <Event name="FIFA" />
        <Event name="Need for Speed" />
        <Event name="Cuphead" />
        <Event name="Spiderman PS4" />
        {/* <Event 
          name="Spiderman PS5"
        /> */}
      </div>
    </div>
  )
}

export default UserEvents
