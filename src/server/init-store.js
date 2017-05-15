// @flow

import Immutable from 'immutable'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import { helloReducer, selectedBook, notesByBook } from '../shared/reducer/hello'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  return createStore(combineReducers({
    hello: helloReducer, book: selectedBook, notes: notesByBook }),
    preloadedState, applyMiddleware(thunkMiddleware, apiMiddleware))
}

export default initStore
