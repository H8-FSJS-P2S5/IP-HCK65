const express = require("express");

const login = require("./login");
const register = require("./register");
const movie = require("./movie");

const router = express.Router();

router.use(login);
router.use(register);
router.use(movie);



module.exports = router;
