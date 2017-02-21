import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import messages from './reducers/messages';
import typers from './reducers/typers';

export default combineReducers({
  flashMessages,
  auth,
  messages,
  typers
});
