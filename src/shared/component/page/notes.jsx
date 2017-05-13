// @flow

import React from 'react'

import { connect } from 'react-redux'
import { selectBook, fetchNotesIfNeeded, invalidateBook } from '../../action/hello'
import Helmet from 'react-helmet'
import Notes from '../notes'

const title = 'Notes Page'

class NotesPage extends React.Component {

  componentDidMount() {
    const { dispatch, selectedBook } this.props
    dispatch(fetchPostsIfNeeded(selectedBook))
  }

  render(){
    <div className="container mt-4">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'All the Notes' },
          { property: 'og:title', content: title },
        ]}
      />
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <p>Here is where all the notes would show up. Use a single note component</p>
          <Notes />
        </div>
      </div>
    </div>
  }
}

export default NotesPage
