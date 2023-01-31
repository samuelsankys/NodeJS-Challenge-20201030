require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { jobsProducts } = require('./jobs/products')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes/index')(app)

jobsProducts()

module.exports = app
