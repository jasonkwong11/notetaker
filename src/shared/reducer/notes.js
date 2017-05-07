// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  NOTES_ASYNC_REQUEST,
  NOTES_ASYNC_SUCCESS,
  NOTES_ASYNC_FAILURE,
} from '../action/notes'

const initialState = Immutable.fromJS({
  title: 'Untitled',
  content: '[no content]',
})

const notesReducer = (state: Immut = initialState, action: { type: string, payload: any}) => {
  switch (action.type) {
    case NOTES_ASYNC_REQUEST:
      return state.set('title', 'Loading...')
    case NOTES_ASYNC_SUCCESS:
      return state.set('notes', action.payload)
    case NOTES_ASYNC_FAILURE:
      return state.set('notes', 'No notes received, please check your connection')
    default:
      return state
  }
}

export default notesReducer
