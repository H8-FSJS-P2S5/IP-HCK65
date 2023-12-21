const express = require('express');
const UserController = require('../controllers/userController');
const register = express.Router()

// endpoint 
register.post("/register", UserController.register);

module.exports = register