const initialState = {
  token: null,
  user: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    case 'LOGOUT_SUCCESS':
      return initialState;
    case 'RECEIVE_SOCKET':
      return {
        ...state,
        user: {...state.user,
          socketID: action.socketID
        }
      };
    default:
      return state;
  }
}
