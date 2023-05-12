import * as styles from './HomePage.module.css'
import { authStore } from '@context'

function HomePage() {
  const { auth } = authStore

  return (
    <div className={styles.container}>
      <h1>Welcome back {auth.user.username}</h1>
      <h2>
        What people are you meeting today? <br />
      </h2>
      <div className={styles.board}>
        <div className={styles.boardItem}>
          <h3>🎉 Recent events:</h3>
          <li>
            <ul>Event 1</ul>
            <ul>Event 2</ul>
            <ul>Event 3</ul>
          </li>
        </div>
        <div className={styles.boardItem}>
          <h3>📌 Pinned Games:</h3>
          <li>
            <ul>Game 1</ul>
            <ul>Game 2</ul>
            <ul>Game 3</ul>
          </li>
        </div>
        <div className={styles.boardItem}>
          <h3>🗨️ Recent Chats:</h3>
        </div>
        <div className={styles.boardItem}>
          <h1>+</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage
