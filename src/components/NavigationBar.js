import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount(){
    const token = cookie.load('token');
    // if(token && this.props.user &&!this.props.user.name){
    //   this.props.authenticateUser();
    // }else if (!token) {
    //   browserHistory.push('/signup');
    // }
    if(!token) {
      browserHistory.push('/signup');
    }
  }
  render() {
    const rightNav = (this.props.user && this.props.user.name) ? (
      <ul className="nav navbar-nav navbar-right">
          <li className="nav-img">
            <img className="avatar img-circle" width="40px" height="40px" src={this.props.user.picture || this.props.user.gravatar}/>
            {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
          </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup">Sign up</Link></li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">React Redux</Link>
          </div>

          <div className="collapse navbar-collapse">
            {rightNav}
          </div>

        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes =  {
  authenticateUser: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NavigationBar);
