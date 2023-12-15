const { User } = require("../models/");
const { OAuth2Client } = require("google-auth-library");
const { uuid } = require("uuidv4");
const { signToken } = require("../helper/jwt");

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
  static async loginGoogle(req, res, next) {
    try {
      const google_token = req.headers["google-token"];
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      const passwordTemp = uuid();

      const [user, created] = await User.findOrCreate({
        where: { email: googleEmail },
        defaults: {
          username: payload.name,
          email: googleEmail,
          password: passwordTemp,
        },
      });
      
      let access_token = await signToken({ id: user.id });
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
