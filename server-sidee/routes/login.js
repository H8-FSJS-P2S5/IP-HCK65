const express = require('express');
const UserController = require('../controllers/userController');
const login = express.Router()

//user endpoint 
login.post("/login", UserController.login);

module.exports = login