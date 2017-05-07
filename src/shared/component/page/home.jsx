// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_NAME } from '../../config'

const HomePage = () =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Note Taker is an app to take notes' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <h1> {APP_NAME} </h1>
  </div>

export default HomePage
