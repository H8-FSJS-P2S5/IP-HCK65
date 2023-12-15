const { MyAnime } = require("../models");

class controllerAnimes {
  static async getAnimes(req, res, next) {
    try {
      const queries = req.query;

      let instance = await MyAnime.getAnimes(queries);

      res.status(200).json(instance);
    } catch (error) {
      next(error);
    }
  }
  static async getAnime(req, res, next) {
    try {
      let animeId = req.params.id;
        // console.log(animeId);
        // console.log(animeId);
      let instance = await MyAnime.getAnime(+animeId);
      res.status(200).json(instance);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controllerAnimes;
