const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET)
}

const verifyToken = (payload) => {
    return jwt.verify(payload, JWT_SECRET)
}

module.exports = {signToken, verifyToken}