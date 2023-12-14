const { MyAnime } = require("../models");

class controllerMyAnime {
  static async getMyAnime(req, res, next) {
    try {
      const id = req.user.id;
      const queries = req.query;
      let instance = await MyAnime.findMyAnime(+id, queries);

      res.status(200).json(instance);
    } catch (error) {
      next(error);
    }
  }
  static async addFav(req, res, next) {
    try {
      const animeId = req.params.id;
      //   console.log(animeId);
      const id = req.user.id;
      //   console.log(id);
      //
      let instance = await MyAnime.addFav(+id, +animeId);
      res.status(201).json(instance);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controllerMyAnime;
