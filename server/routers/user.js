const UserController = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/login', UserController.login)

module.exports = userRouter;