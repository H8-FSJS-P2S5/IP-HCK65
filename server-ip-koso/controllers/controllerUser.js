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
      // const google_token =
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhZDFmZWM3ODUwNGY0NDdiYWU2NWJjZjVhZmFlZGI2NWVlYzllODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NTQ0NTkwMzYyNjgtZWsxZWFxcWQ1N21rMWF0OXIwOW82MzQ2NmZvZXIzc2IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NTQ0NTkwMzYyNjgtZWsxZWFxcWQ1N21rMWF0OXIwOW82MzQ2NmZvZXIzc2IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY2NjQ5NzY2NzU2MTM2OTA5MTYiLCJlbWFpbCI6Im1yLmJvcmVkMjMyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDI1MDIxNDYsIm5hbWUiOiJNciBCb3JlZDIzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0o1cmY0Q2FxcXFLVlVHUWdWX29JV2VXQ2xVUkpqSGtyaTVKcnJMbkxldz1zOTYtYyIsImdpdmVuX25hbWUiOiJNciIsImZhbWlseV9uYW1lIjoiQm9yZWQyMyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNzAyNTAyNDQ2LCJleHAiOjE3MDI1MDYwNDYsImp0aSI6IjI3MmIyZmZhMTU0ZjUzMjdjYmE5ZjljYTcxYjJlOTMwZDkxMzRmNjQifQ.PHAiv32aOagOdiLpKkEq78skem9gYnWAG2YhJH5VQ_bEoV4BrKDb6P_G4tLl532DAW4T0_AdbqW1L89iAJOTVbW2gG2kkN3sJkMDItCVtVAMudL3att7S76LbEgUcvqZebHcSiDl9ivzaZ7HIVnOHaK65H6E6dJysGjwSaspmmc-N8kAe-aOpZQOUqjZuNEPao6VnPb9S-g4XuGsn9qz_0BdU1lAW9_6MyzoNrHb_T1LyuKGUxSHrw_2aD_K7DV6slvm84sWJFLqDePhIVAn1SnLdmtKdtPxUEC-Syi0_Xj7Q1gDJ3_LEckQTYIQGy_gsfhFpi0yaGCThECUmoq10A";
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleEmail = payload.email;
      console.log(payload);
      // console.log(googleEmail);

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
