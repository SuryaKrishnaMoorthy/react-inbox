import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, highLightMessage, bodyHidden, toggleBody }) => {
  return (
    <div>
      {
        messages.map(message => <Message
          key={message.id}
          starMessage={starMessage}
          highLightMessage={highLightMessage}
          bodyHidden={bodyHidden}
          toggleBody={toggleBody}
          { ...message }
        />)
      }
    </div>
  )
}

export default MessageList;
