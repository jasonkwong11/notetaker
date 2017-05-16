import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text }) => (
  <button
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </button>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default Todo
