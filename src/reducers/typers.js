import { TYPING, STOP_TYPING} from '../constants/ActionTypes';

const initialState = [];
export default function typers(state = initialState, action) {
  switch (action.type) {

  case TYPING:
    debugger;
    if (state.indexOf(action.name) === - 1) {
      return [...state, action.name];
    }
    return state;
  case STOP_TYPING:
    return state.filter(user =>
      user !== action.name
    );
  default:
    return state;
  }
}
