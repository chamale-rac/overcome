import * as styles from './HomePage.module.css'
import { authStore } from '@context'

function HomePage() {
  const { auth } = authStore

  return (
    <div className={styles.container}>
      <h1>Welcome back {auth.user.username}!</h1>
      <h2>
        At Overcome we want you to have fun while you practice your social
        skills!
      </h2>
    </div>
  )
}

export default HomePage
