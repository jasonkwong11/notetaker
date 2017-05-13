import React from 'react'
import PropTypes from 'prop-types'

const Notes = ({notes}) => (
  <ul>
    {notes.map((note, i) =>
      <li key={i}>
        <h4>{note.title}</h4>
        <p>{note.content}</p>
      </li>
    )}
  </ul>
)

Posts.propTypes = {
  notes: PropTypes.array.isRequired
}

export default Notes