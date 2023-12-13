const { User } = require("../models/");

class ControllerUser {
  static async login(req, res, next) {
    try {
      const data = req.body;
      let access_token = await User.login(data);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async checkUser(req, res, next) {
    try {
      const id = req.user.id;
      let findUser = await User.findUser(+id);
      res.status(200).json({ findUser });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    try {
      let data = req.body;
      let userLoggedId = req.user.id;
      let instance = await User.editUser(data, userLoggedId);
      res.status(200).json(instance);
    } catch (error) {
      next(error);
    }
  }

  static async ehehe(req, res, next) {
    try {
      const message2 = "ehehehehehhehehe";
      res.status(200).json({ message: message2 });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerUser;
