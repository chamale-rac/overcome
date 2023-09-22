import * as styles from './ParticipantsView.module.css'

function ParticipantsView({participants}) {
  return (
    <div className={styles.participantsViewContainer}>
    {participants.length > 0 &&
      participants.map((participant, i) => {
        let separator = ', '
        if(i+1 === participants.length) {
          separator = ''
        }
        return (
          <div key={participant?.username} >{participant?.username}{separator}</div>
        )
    })}
    </div>
  )
}

export default ParticipantsView
