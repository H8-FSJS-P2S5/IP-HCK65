const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.authorization;

        if (!access_token) throw {name: "InvalidToken"}

        if (access_token.slice(0, 7) !== "Bearer ") throw {name: "InvalidToken"}

        access_token = access_token.slice(7)

        let isvalidToken = verifyToken(access_token);
        console.log(isvalidToken, ">>>>");

        let user = await User.findByPk(isvalidToken.id)

        if (!user) throw {name: "NotFound", message: "Data not found"}

        req.user = {
            id: user.id,
        }

        next()
    } catch (error) {
        console.log(error);
        next(error)
        res.status(500).json(error)
    }
}

module.exports = {authentication};