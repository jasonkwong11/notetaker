// @flow

import React from 'react'

type Props = {
  title: string,
  content: string,
}

const Note = ({ title, content }: Props) =>
  <div className="note">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>

export default Note
