const express = require("express");
const ControllerUser = require("../controllers/controllerUser");
const user = express.Router();

user.get("/", ControllerUser.ehehe); //forMockTesting
user.get("/checkuser", ControllerUser.checkUser);
user.put("/me", ControllerUser.editUser);

module.exports = user;
