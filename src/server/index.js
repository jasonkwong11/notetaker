// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import Mongo from 'mongodb'
import bodyParser from 'body-parser'

import routing from './routing'
import { WEB_PORT, STATIC_PATH, db } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const MongoClient = Mongo.MongoClient

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

MongoClient.connect(db.url, (err, database) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err)
  routing(app, database)

  http.listen(WEB_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development). \nKeep "yarn dev:wds" running in an other terminal.'}.`)
  })
})
