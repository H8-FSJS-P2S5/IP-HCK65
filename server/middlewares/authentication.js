const {verifyToken} = require('../helpers')
const {User} = require('../models')

module.exports = async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization

        if (!access_token) throw {name: "InvalidToken", status: 401}
        if (access_token.slice(0, 7) !== "Bearer ") throw {name: "InvalidToken"}
        access_token = access_token.slice(7)

        let payload = verifyToken(access_token)
        let user = await User.findByPk(payload.id)

        if (!user) throw {name: "InvalidToken", status: 401}
        req.user = {id: user.id, role: user.role, email: user.email, balance: user.balance}
        next()
    } catch (err) {
        next(err)
    }
}



