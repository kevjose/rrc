import React from 'react';

export default class MessageListItem extends React.Component {
  render(){
    const {message} = this.props;
    return (
      <li>
        <span>{message.user.name}
          <em>{message.time}</em>
        </span><br/>
        <div className="text-info">{message.text}</div>
      </li>
    )
  }
}
