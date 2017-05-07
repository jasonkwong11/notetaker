// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import $ from 'jquery'
import Tether from 'tether'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'
import notesReducer from '../shared/reducer/notes'
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(combineReducers(
  { hello: helloReducer }, { notes: notesReducer }),
  { hello: Immutable.fromJS(preloadedState.hello), notes: Immutable.fromJS(preloadedState.notes) },
  composeEnhancers(applyMiddleware(thunkMiddleware)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

setUpSocket(store)
