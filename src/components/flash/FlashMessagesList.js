import React from 'react';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';

class FlashMessagesList extends React.Component {
  render(){
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} />
    );
    return (
      <div>{messages}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired
}
function mapStateToProps(state){
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps)(FlashMessagesList);
