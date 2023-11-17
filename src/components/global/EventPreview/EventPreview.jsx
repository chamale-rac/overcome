import * as styles from './EventPreview.module.css'
import { useNavigate } from 'react-router-dom'

function EventPreview({
  events,
}) {

  const navigate = useNavigate()
  return (
  <>
    {!(events === undefined) && (
      events.map((event) => (
        <aside
          className={styles.border}
          onClick={() => navigate(`/home/events/${event._id}`)}
        >
          {/* title */}
          <p id={styles['previewTitle']} >{event.title}</p>
          <p>-&gt; {event.date.substring(0,10)}</p>
          <p>-&gt; {event.hour}</p>
        </aside>
      )).slice(-3).reverse()
    )}
  </>
  )
}

export default EventPreview
