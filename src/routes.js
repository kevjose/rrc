import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

 export default (
   <Route path="/" component={App} history={browserHistory}>
    <IndexRoute component={Greetings} />
    <Route path="/signup" component={SignupPage} />
   </Route>


 )
