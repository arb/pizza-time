import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';

import rootReducer from './redux/reducers';
import App from './components/app';

import './index.css';

const middleware = [thunk, promiseMiddleware];

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middleware.push(logger);
}

const enhancer = compose(
  applyMiddleware(...middleware),
  persistState('cart', {
    slicer: (path) => (state) => state[path].data,
    merge: (init, persist) => {
      const state = {...init};
      state.cart.data = persist || [];
      return state;
    }
  })
);

const store = createStore(
  rootReducer, {
    cart: {}
  },
  enhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
