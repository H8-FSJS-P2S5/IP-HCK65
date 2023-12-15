if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
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






app.use(errorHandler)
module.exports = app;
