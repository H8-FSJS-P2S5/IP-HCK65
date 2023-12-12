
require("dotenv").config()
const jwt = require('jsonwebtoken');


const signToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
}
const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.SECRET_KEY);
}
module.exports = {signToken, verifyToken}