import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import cookie from 'react-cookie';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null , { userSignupRequest, addFlashMessage })(SignupPage);
