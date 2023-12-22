if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const router = require('./routers')
const app = express()
const cors = require('cors');
const errorHanlder = require('./midlewares/errorHanlder');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())
app.use(router)


app.use(errorHanlder)


module.exports = app
