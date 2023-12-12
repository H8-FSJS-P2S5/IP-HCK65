const {signToken, verifyToken} = require('./jwt')
const bcrypt = require('bcrypt')
const generatePassword = (password) => {
    return bcrypt.hashSync(password, 10)
}
const validatePassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
}

module.exports = {generatePassword, validatePassword, signToken, verifyToken}
