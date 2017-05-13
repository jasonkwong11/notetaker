// @flow
/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectBook, fetchNotesIfNeeded, invalidateBook } from '../../action/hello'
import Helmet from 'react-helmet'
import Notes from '../notes'
import Picker from '../picker'

const title = 'Notes Page'

class NotesPage extends React.Component {

  static propTypes = {
    selectedBook: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedBook } = this.props
    dispatch(fetchNotesIfNeeded(selectedBook))
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.selectedBook !== this.props.selectedBook) {
      const { dispatch, selectedBook } = nextProps
      dispatch(fetchNotesIfNeeded(selectedBook))
    }
  }

  handleChange = (nextBook: Object) => {
    this.props.dispatch(selectBook(nextBook))
  }

  handleRefreshClick = (e: Object) => {
    e.preventDefault()

    const { dispatch, selectedBook } = this.props
    dispatch(invalidateBook(selectedBook))
    dispatch(fetchNotesIfNeeded(selectedBook))
  }

  render(){
    const { selectedBook, notes, isFetching, lastUpdated } = this.props
    const isEmpty = notes.length === 0

    return (
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
            <div>
              <Picker value={selectedBook}
                onChange={this.handleChange}
                options={[ 'app ideas', 'people to email']} />
              <p>
                {lastUpdated &&
                  <span>
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    {' '}
                  </span>
                }
                {!isFetching &&
                  <a href="#" onClick={this.handleRefreshClick}>
                    Refresh
                  </a>
                }
              </p>
              {isEmpty
                ? (isFetching ? <h2>Loading...</h2> : <h2>Empty</h2>)
                : <div style={{ opacity: isFetching ? .5 : 1 }}>
                    <Notes notes={notes} />
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedBook, notesByBook } = state
  const {
    isFetching,
    lastUpdated,
    notes: notes
  } = notesByBook[selectedBook] || {
    isFetching: true,
    notes: []
  }

  return {
    selectedBook,
    notes,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(NotesPage)

