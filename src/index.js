import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import "regenerator-runtime/runtime.js";
import 'fontsource-roboto';
import App from './containers/app';
import reducer from './reducers';

const initialState = [];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.querySelector('.app')
);
