const express = require('express');
const UserController = require('../controllers/userController');
const login = express.Router()

//user endpoint 
login.post("/login", UserController.login);
login.post("/google-login", UserController.googleLogin);

module.exports = login