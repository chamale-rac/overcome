import * as styles from './ChatPreview.module.css'

function ChatPreview({
  chats
})
{
  function MessagePreview ({messages}) {
    return (
      <>
      {
      messages.map((mssg) =>(
        mssg!==undefined &&
        <p>&#10003; { mssg.user.username}: { mssg.message} </p>
      ))
      }
      </>
    )}

  return (
    <>
    {(!(chats === undefined) && (!(chats === undefined)) ) && (
      chats.map((chat) => (
      (chat!==null) && (
      <aside className={styles.border} >
        <p id={styles['previewChat']} >{chat.eventTitle}</p>
        <MessagePreview
          messages={chat.messages}
        />
        {/* <p>-&gt; { chat.messages[0].message } </p> */}
      </aside>
      )
      )).slice(0,3)
    )}
  </>
  )}

export default ChatPreview
