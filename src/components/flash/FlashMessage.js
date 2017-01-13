import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  render(){
    const {id, type, text} = this.props.message;
    return (
      <div className={classnames('alert',{
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>{text} - ({id})</div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage;
