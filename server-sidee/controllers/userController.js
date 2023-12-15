const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { code: 400, message: "Email is required" };
      }

      if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const dataLoginUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!dataLoginUser) {
        throw { code: 400, message: "Invalid email/password" };
      }

      const comparedPassword = comparePassword(password, dataLoginUser.password);

      if (!comparedPassword) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const payload = {
        id: User.id,
      };

      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      if (error.code !== undefined) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
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
      if (
        (error.name === "SequelizeValidationError") |
        (error.name === "SequelizeUniqueConstraintError")
      ) {
        res.status(400).json({ message: error.errors[0].message });
      }
    }
  }
}

module.exports = UserController;
