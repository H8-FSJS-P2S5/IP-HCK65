const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

async function isLoggedIn(req, res, next) {
  try {
    let token = req.headers.authorization;
    // console.log(token)
    if (!token) throw { name: "TokenNotFound" };
    let splitToken = token.split(" ");
    // console.log(splitToken[0])
    if (splitToken[0] !== "Bearer" || splitToken[0] !== "google-token")
      throw { name: "InvalidToken" };
    token = splitToken[1];
    let payload = verifyToken(token);
    // console.log(payload);
    let user = await User.findByPk(payload.id);
    // console.log(user, "<<<<<<<<<<<<<<<<<")
    if (!user) throw { name: "InvalidToken" };
    req.user = {
      id: user.id,
    };
    // console.log(req.user)
    next();
  } catch (error) {
    // console.log(error)
    next(error);
  }
}

module.exports = { isLoggedIn };
