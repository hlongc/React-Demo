const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Router = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', Router)
app.listen(9093, () => {
  console.log('node app start at 9093')
})