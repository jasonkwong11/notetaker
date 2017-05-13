import React from 'react'

class CreateNote extends React.Component {
  constructor() {
    super()

    this.submitForm = this.submitForm.bind(this)
    this.formUpdate = this.formUpdate.bind(this)

    this.state = {
      title: '',
      content: '',
    }
  }
}

export default CreateNote
