const { comparePass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
    static async readData(req, res, next) {
        
    const axios = require("axios");
    const options = {
      method: "GET",
      url: "https://pizza-and-desserts.p.rapidapi.com/pizzas/1",
      headers: {
        "X-RapidAPI-Key": "d6c96e0c45msh0a914142564993dp179882jsn37b0d08b1e23",
        "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        throw {name: "BadRequest", message: "Email or password is required"}
      }

      let findUser = await User.findOne({where: {email}})

      if (!findUser) throw {name: "Unauthorized"}

      let validPass = comparePass(password, findUser.password)

      if (!validPass) throw {name: "Unauthorized"}

      if (email !== findUser.email) throw {name: "Unauthorized"}

      const access_token = signToken({id: findUser.id})

      res.status(200).json({access_token: access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;