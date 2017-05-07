// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { notesEndpointRoute } from '../../shared/routes'

export const NOTES_ASYNC_REQUEST = 'NOTES_ASYNC_REQUEST'
export const NOTES_ASYNC_SUCCESS = 'NOTES_ASYNC_SUCCESS'
export const NOTES_ASYNC_FAILURE = 'NOTES_ASYNC_FAILURE'

export const notesAsyncRequest = createAction(NOTES_ASYNC_REQUEST)
export const notesAsyncSuccess = createAction(NOTES_ASYNC_SUCCESS)
export const notesAsyncFailure = createAction(NOTES_ASYNC_FAILURE)

export const notesAsync = () => (dispatch: Function) => {
  dispatch(notesAsyncRequest())
  return fetch(notesEndpointRoute(), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.serverMessage) throw Error('No notes received')
      dispatch(notesAsyncSuccess(data.notes))
    })
    .catch(() => {
      dispatch(notesAsyncFailure())
    })
}
