import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { googleLogin } from '../../actions/oauth';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      (data) => {
        console.log(data);
        this.props.addFlashMessage({
          type:'success',
          text:'Signup Successful'
        })
        browserHistory.push('/');
      }
    );
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <h2>Join our community</h2>
          <div className="form-group">
            <label className="control-label">Username</label>
            <input
              value={this.state.username}
              onChange={this.onChange}
              type="text"
              name="username"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-success">
              Sign Up
            </button>
          </div>

        </form>

        <hr/>

        <div className="form-group">
          <button className="btn btn-danger" onClick={this.handleGoogle}>Sign in with Google</button>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(SignupForm);
