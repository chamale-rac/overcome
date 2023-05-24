import * as styles from './Event.module.css'

function Event({ name, people, hour, date, link, creator, url }) {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p>Creator: {creator}</p>
      <p>Hour: {hour}</p>
      <p>Date: {date}</p>
      {/*
      //people is still no added to the model
      <div>People: {people.map((person) => person.username).join(', ')}</div> */}
      <div
        className="mt-3"
        style={{
          width: '100%',
          textAlign: 'end',
        }}
      >
        <a>{link}<br/></a>
        {url && (
          <>
            <br />
            <a href={url} target="_blank">
              Link: {url}
            </a>
          </>
        )}
      </div>
      <div className={styles.flex}>
      <button>Save 💾</button>
      <button>Details 🧮</button>
      </div>
    </div>
  )
}

export default Event
