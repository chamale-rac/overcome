import * as styles from './EventPreview.module.css'

function EventPreview({
  events,
}) {

  return (
    // <aside className={styles.border} >
    //   {/* title */}
    //   <p id={styles['previewTitle']} >{title}</p>
    //   <p>-&gt; {date}</p>
    //   <p>-&gt; {hour}</p>
    // </aside>

  <>
    {!(events === undefined) && (
      events.map((event) => (
        <aside className={styles.border} >
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
