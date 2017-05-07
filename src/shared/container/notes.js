// @flow

import { connect } from 'react-redux'
import Note from '../component/note'

const mapStateToProps = state => ({
  title: state.notes.get('title'),
  content: state.notes.get('content'),
})

export default connect(mapStateToProps)(Note)
