import * as styles from './Profile.module.css'

function Profile() {
  return (
    <div className={styles.container}>
      <h1>Perfil de usuario</h1>
      <section className={styles.custom_section}>
        <div className={styles.main_info}>
          <img src="/public/profile-400.png" alt="Foto de perfil de Juan" />
          <h3>Juan Pérez</h3>
          <h4>@username</h4>
        </div>
        <p>
          ¡Hola! Soy Juan, tengo 28 años y me encanta el deporte. Me dedico a la
          enseñanza del yoga y me gusta mucho compartir mis conocimientos con
          otras personas.
        </p>
      </section>
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Mis actividades</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      </section>
      <section className={`${styles.custom_section} ${styles.sub_section}`}>
        <h2>Mis juegos</h2>
        <ul>
          <li>Grand Theft Auto 5</li>
          <li>Minecraft</li>
          <li>Valorant</li>
        </ul>
      </section>
    </div>
  )
}

export default Profile
