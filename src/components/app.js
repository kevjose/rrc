import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import { authenticateUser } from '../actions/authenticateActions';

class App extends React.Component {
  render(){
    const { authenticateUser } = this.props;
    return (
      <div>
        <NavigationBar authenticateUser={authenticateUser}/>
        <FlashMessagesList />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes =  {
  authenticateUser: React.PropTypes.func.isRequired
}


export default connect(null,{ authenticateUser })(App);
