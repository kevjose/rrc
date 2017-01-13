import shortid from 'shortid';

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE':
      let newState =  [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
      console.log(newState);
      return newState;
      break;

    default: return state;
  }
}
