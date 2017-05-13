// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { helloEndpointRoute } from '../../shared/routes'
import * as actionTypes from './actionTypes'

// Regular synchronous action
export const sayHello = createAction(actionTypes.SAY_HELLO)

export function selectBook(book: Object) {
  return {
    type: actionTypes.SELECT_BOOK,
    book,
  }
}

export function invalidateBook(book: Object) {
  return {
    type: actionTypes.INVALIDATE_BOOK,
    book,
  }
}

export function requestNotes(book: String) {
  return {
    type: actionTypes.REQUEST_NOTES,
    book,
  }
}

export function receiveNotes(book: Object, json: Object) {
  return {
    type: actionTypes.RECEIVE_NOTES,
    book,
    notes: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  }
}

export const fetchNotes = (book: String) => (dispatch: Function) => {
  dispatch(requestNotes(book))
  return fetch('http://localhost:8000/api.json')
    .then(response => response.json())
    .then(json => dispatch(receiveNotes(book, json)))
}

export const shouldFetchNotes = (state: Object, book: String) => {
  const notes = state.notesByBook[book]
  if (!notes) {
    return true
  }
  if (notes.isFetching) {
    return false
  }
  return notes.didInvalidate
}

export const fetchNotesIfNeeded = (book: String) => (dispatch: Function, getState: Function) => {
  if (shouldFetchNotes(getState(), book)) {
    return dispatch(fetchNotes(book))
  }
  return getState()
}

// Async actions
export const sayHelloAsyncRequest = createAction(actionTypes.SAY_HELLO_ASYNC_REQUEST)
export const sayHelloAsyncSuccess = createAction(actionTypes.SAY_HELLO_ASYNC_SUCCESS)
export const sayHelloAsyncFailure = createAction(actionTypes.SAY_HELLO_ASYNC_FAILURE)

export const sayHelloAsync = (num: number) => (dispatch: Function) => {
  dispatch(sayHelloAsyncRequest())
  return fetch(helloEndpointRoute(num), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.serverMessage) throw Error('No message received')
      dispatch(sayHelloAsyncSuccess(data.serverMessage))
    })
    .catch(() => {
      dispatch(sayHelloAsyncFailure())
    })
}
