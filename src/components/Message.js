import React from 'react';

const Message = ({ id, subject, read, starred, labels, selected, starMessage, highLightMessage }) => {

  const isRead = read ? 'read': 'unread'
  const isSelected = selected ? 'selected': ''
  const isStarred = starred ? 'fa-star': 'fa-star-o'
  const isChecked = selected ? 'checked' : ''
  //onClick={() => starMessage(id)} OR onClick={() => starMessage.bind(null, id)}

  return (
    <div className={`row message ${isRead} ${isSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onClick={() => highLightMessage(id)} type="checkbox" checked={`${isChecked}`}/>
          </div>
          <div className="col-xs-2">
            <i onClick={() => starMessage(id)} className={`star fa ${isStarred}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        { labels.map((label, i) => <span key={i} className="label label-warning">{label}</span> ) }
        <a href="#">
          { subject }
        </a>
      </div>
    </div>
  )
}

export default Message;
