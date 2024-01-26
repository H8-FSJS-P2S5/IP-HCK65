const { comparePass, hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async addUaser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const newUser = await User.create({ name, email, password });

      res
        .status(201)
        .json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res) {
    try {
      let google_token = req.headers.google_token;
      
      // console.log(google_token, "KKKKKKKKKKKKKKK")
      
      let ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { name, email } = ticket.getPayload();
      // console.log(name, email, "MMMMMMMMM");
      
      // ngebuat user dengan informasi dari payload google:
      // 1 check apakah user sudah ada didatabase
      // 2 jika sudah ada generate token
      // 3 jika belum ada, kita harus ngebuat user baru dari informasi didalam payload
      // generate token

      let userfind = await User.findOne({where: {email}})
      if (userfind) {
        let access_token = signToken({id: userfind.id})
        res.status(200).json({access_token})
      } else {
        let newUser = await User.create({
          name: name,
          email: email,
          password: String(Math.random())
        }, {
          hooks: false
        })
        let access_token = signToken({id: userfind.id})
        res.status(200).json({access_token})
      }

      /*
        Process login:
        - ambil email/password dari body
        - validasi email/password
        - cari user dengan email dari database
        - check apakah password sama atau tidk
        - jika sama generate token
       */

      // let [user, isNew] = await User.findOrCreate({
      //   where: {
      //     email: email,
      //   },
      //   default: {
      //     name: name,
      //     email: email,
      //     password: signToken({ random: String(Math.random()) }),
      //   },
      // });
      // console.log("MASUK SINI")
      // let access_token = signToken({ id: user.id });
      // res.status(200).json({ access_token });

      // res.json({message: "Login success"})
    } catch (error) {
      console.log(error);
    }
  }

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
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "BadRequest", message: "Email or password is required" };
      }

      let findUser = await User.findOne({ where: { email } });

      if (!findUser) throw { name: "Unauthorized" };

      let validPass = comparePass(password, findUser.password);

      if (!validPass) throw { name: "Unauthorized" };

      if (email !== findUser.email) throw { name: "Unauthorized" };

      const access_token = signToken({ id: findUser.id });

      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }

  static async upgradeAccount(req, res, next) {
    try {
      // kita akan carikan order berdasarkan order id
      // kemuudian disini kita akan cek ke midtrans apa status orderid tersebut
      // kalo capture/setlement => berarti pembayarannya success
      // kita akan update order statusnya jd paid
      // lalu eksekusi
      res.json({ message: "Upgrade success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
