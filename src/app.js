const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app
