// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Notes from '../../container/notes'

const title = 'Notes Page'

const NotesPage = () =>
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

export default NotesPage
