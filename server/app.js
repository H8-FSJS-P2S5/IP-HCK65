require("dotenv").config()
// const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
// app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// error handler
app.use(function (err, req, res, next) {
    res.send('error')
});

module.exports = app;
