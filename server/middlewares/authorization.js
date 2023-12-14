const Helper = require('../helpers')
const {User, Article} = require('../models')

async function adminOnly(req, res, next) {
    try {
        if (req.user.role === "Admin") {
            next()
        } else {
            throw {name: "InvalidToken", message: "Unauthorized", status: 401}
        }
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    try {
        let {id} = req.params
        let article = await Article.findByPk(id)

        if (!article) throw {name: "NotFound", message: "error not found", status: 404}

        if (req.user.role !== "Admin" && req.user.id != article.authorId) {
            throw {name: "Forbidden", message: "Forbidden", status: 403}
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {adminOnly, authorization}



