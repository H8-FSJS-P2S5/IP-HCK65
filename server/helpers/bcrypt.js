const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass, salt)
};

const comparePass = (plainPass, pass) => {
    return bcrypt.compareSync(plainPass, pass)
};

module.exports = {
    hashPass,
    comparePass
};