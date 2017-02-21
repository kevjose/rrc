import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {authenticateUser, fetchMessages } from '../actions/authenticateActions';
import Chat from './chat/Chat.js';

const socket = io('', { path: '/api/chat' });
const initialChannel = 'Lobby';

class Greetings extends React.Component {
  componentWillMount(){
    const  { dispatch, user } = this.props;
    if(!user._id) {
      dispatch(authenticateUser());
    }
    dispatch(fetchMessages(initialChannel));
  }
  // openNav(){
  //   document.getElementById("mySidenav").style.width = "250px";
  // }
  // closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  // }
  render() {
    return (
      <div>
        {/* <span className="hidden-md hidden-lg" onClick={::this.openNav} style={{'cursor':'pointer'}}><b>&#9776; Open</b></span>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={::this.closeNav}>&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div> */}
        <Chat {...this.props} socket={socket} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages.data,
    typers: state.typers,
  };
};

export default connect(mapStateToProps)(Greetings);
