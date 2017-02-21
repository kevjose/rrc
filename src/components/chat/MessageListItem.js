import React from 'react';
import classnames from 'classnames';

export default class MessageListItem extends React.Component {
  render(){
    const {message, user} = this.props;
    return (
      <div className="col-md-12">
        <div className={classnames('col-md-6 panel', { 'panel-info pull-right': (message.user.email === user.email),'panel-success pull-left':(message.user.email !== user.email) })}>
          <div className="panel-heading">
            <div className="text-info"><b>{message.text}</b></div>
            <small className="text-muted">{message.user.name}</small>&nbsp; at <time>{message.time}</time>
            <br/>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>

    )
  }
}
