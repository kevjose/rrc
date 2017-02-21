import axios from 'axios';
import * as types from '../constants/ActionTypes';
import moment from 'moment';

export function authenticateUser (){
  return dispatch => {
    return axios.post('/api/authenticate/user')
    .then(response => dispatch(oauthSuccess(response.data)));
  }
}

export function oauthSuccess(data){
  return {
    type: 'OAUTH_SUCCESS',
    token: data.token,
    user: data.user
  }
}

export function receiveSocket(socketID) {
  return {
    type: 'RECEIVE_SOCKET',
    socketID
  }
}

export function fetchMessages(channel) {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch(error => {throw error});
  }
}
export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}
function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}
function receiveMessages(json, channel) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  }
}



export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)})
      .catch(error => {throw error});
  }
}
function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function typing(name) {
  return {
    type: types.TYPING,
    name
  };
}

export function stopTyping(name) {
  return {
    type: types.STOP_TYPING,
    name
  };
}
