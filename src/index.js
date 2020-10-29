import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './containers/app';
import reducer from './reducers';

const initialState = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducer, initialState);

ReactDOM.render(
  <App store={store} />,
  document.querySelector('.app')
);
