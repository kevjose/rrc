import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import cookie from 'react-cookie';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';


export default function getRoutes(store) {
  var token = cookie.load('token');
  const ensureAuthenticated = (nextState, replace) => {
   token = cookie.load('token');
   if (!token) {
     replace({ pathname :'/signup' });
   }
  };
  const skipIfAuthenticated = (nextState, replace) => {
   token = cookie.load('token');
   if (token) {
     replace({ pathname: '/' });
   }
  };
 return (
   <Route path="/" component={App} history={browserHistory}>
    <IndexRoute component={Greetings} onEnter={ensureAuthenticated}/>
    <Route path="/signup" component={SignupPage} onEnter={skipIfAuthenticated}/>
   </Route>
 );
}
