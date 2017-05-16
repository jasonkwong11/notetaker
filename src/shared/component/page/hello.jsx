// @flow

import React from 'react'
import Helmet from 'react-helmet'

import HelloButton from '../../container/hello-button'
import Message from '../../container/message'

import Footer from '../../component/footer'
import AddTodo from '../../container/add-todo'
import VisibleTodoList from '../../container/visible-todo-list'

const title = 'Hello Page'

const HelloPage = () =>
  <div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to say hello... for now' },
        { property: 'og:title', content: title },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <h1>{title}</h1>
        <Message />
        <HelloButton />
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    </div>
  </div>

export default HelloPage
