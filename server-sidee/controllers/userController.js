const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw {message: "Email is required" };
      }

      if (!password) {
        throw {message: "Password is required" };
      }

      const dataLoginUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!dataLoginUser) {
        throw { message: "Invalid email/password" };
      }

      const comparedPassword = comparePassword(
        password,
        dataLoginUser.password
      );

      if (!comparedPassword) {
        throw { message: "Invalid email/password" };
      }

      console.log(dataLoginUser);
      const payload = {
        id: dataLoginUser.id,
      };

      const access_token = createToken(payload);
      res.status(200).json({ access_token, id: dataLoginUser.id, status: dataLoginUser.status });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res) {
    try {
      // const {google_token} = req.body
      // console.log(req.headers.google_token, "di user controller login google");
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.google_client,
      });
      const payload = ticket.getPayload();
      // console.log(payload, "ini payload di usercontroller login google");

      const user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        const user = await User.create({
          email: payload.email,
          fullName: payload.name,
          password: String(Math.random()),
          status : "free"
        });
      }

      console.log(user, "data user google di controller");
      // const userid = payload["sub"];

      const payloadId = {
        id: user.id,
      };

      const access_token = createToken(payloadId);
      res.status(200).json({ access_token, id: user.id, status: user.status});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res) {
    try {
      const { fullName, email, password } = req.body;
      const newUser = await User.create({ fullName, email, password });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
