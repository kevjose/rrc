import React from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import {receiveSocket, createMessage, receiveRawMessage,typing ,stopTyping} from '../../actions/authenticateActions';

export default class Chat extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount(){
    const {socket, user, dispatch} = this.props;
    socket.emit('chat mounted');
    socket.on('receive socket', socketID => {
      dispatch(receiveSocket(socketID));
    });
    socket.on('new bc message', msg =>{
      dispatch(receiveRawMessage(msg))
    });
    socket.on('typing bc', user =>{
      console.log('typing bc');
      dispatch(typing(user))
    });
    socket.on('stop typing bc', user =>
      dispatch(stopTyping(user))
    );
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(createMessage(newMessage));
    }
  }

  render(){
    const {messages, socket, user, typers } = this.props;
    const filteredMessages = messages.filter(message => message.channelID === 'Lobby');
    let view = null;
    if(user && user._id){
      view = <div>
        {/* {user.name} <br/> {user.socketID }
      <br/><hr/> */}
      <div className="row">
        <span className="hidden-md hidden-lg" onClick={::this.openNav} style={{'cursor':'pointer'}}><b>&#9776; Show Channels</b></span>
        <div id="mySidenav" className="sidenav" style={{'height':'86vh'}}>
          <a href="javascript:void(0)" className="closebtn" onClick={::this.closeNav}>&times;</a>
          <a>Lobby</a>

        </div>
        <div className="col-md-4">
          <div className="panel panel-info hidden-sm hidden-xs" style={{'height': '75vh', 'overflowY':'scroll'}}>
            <div className="panel-heading">Channels</div>
            <div className="panel-body">
              <br/>
              <ul className="list-group">
                <li className="list-group-item active">Lobby</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="panel panel-default">
            <div className="panel-heading">Messages</div>
            <div className="panel-body" style={{'height': '70vh', 'overflowY':'scroll'}}>
              <ul ref="messageList">
                {filteredMessages.map(message =>
                  <MessageListItem message={message} key={message.id} user={user} />
                )}
              </ul>
            </div>
            <div className="panel-footer">
              <MessageComposer socket={socket} activeChannel="Lobby" user={user} onSave={this.handleSave} />
              {typers.length === 1 &&
                <small className="text-muted">{typers[0]} is typing</small>
              }
              {typers.length === 2 &&
                <small className="text-muted">{typers[0]}, {typers[1]} are typing</small>
              }
              {typers.length > 2 &&
                <small className="text-muted">Several people are typing</small>
              }
            </div>
          </div>
        </div>
      </div>
      </div>
    }else{
      view = <div className="text-center">Loading...</div>
    }

    return (
      <div>
        {view}

      </div>

    );
  }
}
