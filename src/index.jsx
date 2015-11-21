import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import fareSim from './reducers';
import CustomerBehaviorManager from './engine/customer.js';

require('bootstrap-css-only/css/bootstrap.css');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(fareSim);

const customerBehaviorManager = new CustomerBehaviorManager(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
