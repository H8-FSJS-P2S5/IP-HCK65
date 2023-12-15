const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(data) {
  return jwt.sign(data, SECRET_KEY)

}

function verifyToken(access_token) {
  return jwt.verify(access_token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };

