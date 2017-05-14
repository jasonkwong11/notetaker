// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import routing from './routing'
import { WEB_PORT, STATIC_PATH, db } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const app = express()
// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

routing(app, {})

mongoose.connect(db.url, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err)
})

const database = mongoose.connection

database.on('error', (err) => {
  console.log('Database has connection error', err)
})

database.once('open', () => {
  console.log('Database has çonnected!!')
})

routing(app, {})

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development). \nKeep "yarn dev:wds" running in an other terminal.'}.`)
})
