import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import './styles/app.scss';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import configureStore from './store/configureStore';

const store = configureStore(window.INITIAL_STATE);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>, document.getElementById('main'));
