import axios from 'axios';

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
