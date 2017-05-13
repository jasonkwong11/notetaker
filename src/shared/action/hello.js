// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { helloEndpointRoute } from '../../shared/routes'
import * as actionTypes from './actionTypes'

// Regular synchronous action
export const sayHello = createAction(actionTypes.SAY_HELLO)

export function selectBook(book) {
  return {
    type: actionTypes.SELECT_BOOK,
    book
  }
}

export function invalidateBook(book) {
  return {
    type: actionTypes.INVALIDATE_BOOK,
    book
  }
}

export function requestNotes(book) {
  return {
    type: actionTypes.REQUEST_NOTES,
    book
  }
}

export function receiveNotes(book, json) {
  return {
    type: actionTypes.RECEIVE_NOTES,
    book,
    notes: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const fetchNotes = book => dispatch => {
  dispatch(requestNotes(book))
  return fetch(`http://localhost:8000/api/${book}.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveNotes(book, json)))
}

export const shouldFetchNotes = (state, book) => {
  const notes = state.notesByBook[book]
  if (!notes) {
    return true
  }
  if (notes.isFetching) {
    return false
  }
  return books.didInvalidate
}

export const fetchNotesIfNeeded = book => (dispatch, getState) => {
  if (shouldFetchNotes(getState(), book)) {
    return dispatch(fetchNotes(book))
  }
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
