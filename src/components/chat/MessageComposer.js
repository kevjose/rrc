import React from 'react';
import moment from 'moment';
import uuid from 'node-uuid';

export default class MessageComposer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state ={
      text:'',
      typing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    const {user, socket, activeChannel} = this.props;
    const text = event.target.value.trim();
    if(event.which === 13){
      event.preventDefault();
      var newMessage = {
        id:`${Date.now()}${uuid.v4()}`,
        channelID: this.props.activeChannel,
        text: text,
        user: user,
        time: moment.utc().format('lll')
      }
      socket.emit('new message', newMessage);
      socket.emit('stop typing', {user: user.name, channel: activeChannel });
      this.props.onSave(newMessage);
      this.setState({'text':'', typing: false});
    }
  }

  handleChange(event){
    const {socket, user, activeChannel} = this.props;
    this.setState({text: event.target.value });
    if(event.target.value.length > 0 && !this.state.typing){
      socket.emit('typing', {user: user.name, channel: activeChannel});
      this.setState({typing: true});
    }
    else if(event.target.value.length === 0 && this.state.typing){
      socket.emit('stop typing', {user: user.name, channel: activeChannel});
      this.setState({typing: false});
    }
  }

  render() {
    return (
      <div>
        <textarea
          className="form-control"
          name="message"
          id="message"
          rows="3"
          ref="messageComposer"
          placeholder="Type here to chat"
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          >
        </textarea>
      </div>
    )
  }
}
