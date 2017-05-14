// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import * as actionTypes from '../action/actionTypes'

const initialState = Immutable.fromJS({
  message: 'Initial reducer message',
  messageAsync: 'Initial reducer message for async call',
})

export const helloReducer = (
    state: Immut = initialState,
    action: { type: string, payload: any},
  ) => {
  switch (action.type) {
    case actionTypes.SAY_HELLO:
      return state.set('message', action.payload)
    case actionTypes.SAY_HELLO_ASYNC_REQUEST:
      return state.set('messageAsync', 'Loading...')
    case actionTypes.SAY_HELLO_ASYNC_SUCCESS:
      return state.set('messageAsync', action.payload)
    case actionTypes.SAY_HELLO_ASYNC_FAILURE:
      return state.set('messageAsync', 'No message received, please check your connection')
    default:
      return state
  }
}

// NoteTaker Stuff

export const selectedBook = (state: Immut = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.SELECT_BOOK:
      return action.book
    default:
      return state
  }
}

const notes = (state = {
  isFetching: false,
  didInvalidate: false,
  notes: [],
}, action) => {
  switch (action.type) {
    case actionTypes.INVALIDATE_NOTES:
      return {
        ...state,
         // eslint-disable-next-line comma-dangle
        didInvalidate: true
      }
    case actionTypes.REQUEST_NOTES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case actionTypes.RECEIVE_NOTES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        notes: action.notes,
        lastUpdated: action.receivedAt,
      }
    default:
      return state
  }
}

export const notesByBook = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case actionTypes.INVALIDATE_BOOK:
    case actionTypes.RECEIVE_NOTES:
    case actionTypes.REQUEST_NOTES:
      return {
        ...state,
        [action.book]: notes(state[action.book], action),
      }
    default:
      return state
  }
}
