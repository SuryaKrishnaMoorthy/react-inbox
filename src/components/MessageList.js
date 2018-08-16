import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, highLightMessage }) => {
  return (
    <div>
      {
        messages.map(message => <Message key={message.id} starMessage={starMessage} highLightMessage={highLightMessage} { ...message }/>)
      }
    </div>
  )
}

export default MessageList;
