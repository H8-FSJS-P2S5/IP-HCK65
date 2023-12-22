const express = require("express")
const usersController = require("../controllers/usersController")
const users = express.Router()
const { authentication } = require("../midlewares/authentication")


users.post("/register", usersController.register)
users.get("/verify-email", usersController.verifyEmail)
users.post("/login", usersController.login)
users.post("/google-login", usersController.loginGoogle)

users.use(authentication)
users.put("/", usersController.updateProfile)
users.get("/", usersController.getUser)

module.exports = users