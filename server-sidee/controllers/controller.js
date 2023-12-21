const { Movies, Review, Genre } = require("../models");

function convertData(originalData) {
  const newData = [];

  for (const movie of originalData) {
    const stars = movie.Stars.join(', ');
    const genreId = Genre[movie.genre[0]] || 0;

    const newMovie = {
      title: movie.title,
      description: movie.description,
      Stars: stars,
      GenreId: genreId,
      images: movie.images[1][1],  
      year: movie.year
    };

    newData.push(newMovie);
  }

  return newData;
}

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

      let originalData = require('../data/t.json')
      // harus looping data json biar sama kayak rapid
      const convertedData = convertData(originalData);
      
      const getMovie = await Movies.findAll();

      console.log(getMovie, "get movie");
      console.log(convertedData, "controller get movies");
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
      console.log(req.body, "edit controller");
      const { name, headline, review, UserId, MovieId  } = req.body;

      let dataEditReview = await Review.findByPk(id);
      if (!dataEditReview) {
        throw { name: "NotFound" };
      }
      await dataEditReview.update({name, headline, review, UserId, MovieId  });
      res.status(200).json({
        MovieId: dataEditReview.MovieId,
        message: `Review has been updated!`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async getEditById(req, res) {
    try {
      console.log("masuk");
      const { id } = req.params;
      const dataReviewById = await Review.findOne({
        where: {
           id
        },
       
      });
  
      console.log("masuk getEditById controller");
  
      if (!dataReviewById || dataReviewById.length === 0) {
        throw { message: "Not Found" };
      }
  
      res.status(200).json(dataReviewById)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
}

module.exports = Controller;
