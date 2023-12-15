const { Movies, Review } = require("../models");

class Controller {
  static async getMovies(req, res) {
    try {
      console.log("masuk getmovie be");
      // console.log(req.user, ">>");
      
      // const { data } = await axios({
      //   method: "GET",
      //   url: "https://imdb-top-100-movies1.p.rapidapi.com/",
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "864ff3300fmshcf160a65dec8800p122df3jsn3e75fb70c1a1",
      //     "X-RapidAPI-Host": "imdb-top-100-movies1.p.rapidapi.com",
      //   },
      // });

      // let dataJsonMovie = require('../data/t.json')
      //harus looping data json biar sama kayak rapid
      
      const getMovie = await Movies.findAll();

      // console.log(getMovie, "get movie");
      res.status(201).json(getMovie);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getDetailMovieById(req, res) {
    try {
      const { id } = req.params;
      console.log(id, "data review");
  
      const dataReview = await Movies.findOne({
        where: { id: id },
      });
  
      // console.log(dataReview, ">>>>");
  
      if (!dataReview) {
        return res.status(404).json({ message: "Not Found" });
      }
  
      return res.status(200).json(dataReview);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

  static async postReview(req, res) {
    try {

      const {id} = req.params
      const { name, headline, review } = req.body;
      let reviews = await Review.create({
        name,
        headline,
        review,
        UserId: req.user.id,
        MovieId: id
      });

      res.status(201).json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getReviewById(req, res){
    try {
      console.log("masukk review");
      const { id } = req.params;
      // console.log(id, "data review");
      const dataReviewById = await Review.findAll({
        where : {
          MovieId : id
        }
      });
      // console.log(dataReviewById);
      console.log("masuk edit by id cuy");

      if (!dataReviewById) {
        throw { message: "Not Found" };
      }

      res.status(200).json(dataReviewById)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteReviewById(req, res) {
    try {
      const { id } = req.params;

      await Review.destroy({ where: { id } });
      res.status(200).json({ message: "Success Delete Review" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async EditReviewById(req, res) {
    try {
      const { id } = req.params;
      const { name, headline, review, UserId, MovieId  } = req.body;

      let dataEditReview = await Review.findByPk(id);
      if (!dataEditReview) {
        throw { name: "NotFound" };
      }
      await dataEditReview.update({name, headline, review, UserId, MovieId  });
      res.status(200).json({
        message: `Review has been updated!`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
