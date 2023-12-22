const { Movies, Review, Genre, User } = require("../models");
const midtransClient = require("midtrans-client");
const MIDTRANS_API_SERVER = process.env.MIDTRANS_API_SERVER;


function convertData(originalData) {
  const newData = [];

  for (const movie of originalData) {
    const stars = movie.Stars.join(", ");
    const genreId = Genre[movie.genre[0]] || 0;

    const newMovie = {
      title: movie.title,
      description: movie.description,
      Stars: stars,
      GenreId: genreId,
      images: movie.images[1][1],
      year: movie.year,
    };

    newData.push(newMovie);
  }

  return newData;
}

class Controller {
  static async getMovies(req, res, next) {
    try {
      console.log("masuk getmovie");
      // console.log(req.user, ">>");

      let originalData = require("../data/t.json");
      const convertedData = convertData(originalData);

      const getMovie = await Movies.findAll();

      // console.log(getMovie, "get movie");
      // console.log(convertedData, "controller get movies");
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
      next(error);
    }
  }

  static async postReview(req, res) {
    try {
      const { id } = req.params;
      const { name, headline, review } = req.body;
      let reviews = await Review.create({
        name,
        headline,
        review,
        UserId: req.user.id,
        MovieId: id,
      });

      res.status(201).json(reviews);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getReviewById(req, res) {
    try {
      console.log("masukk review");
      const { id } = req.params;
      // console.log(id, "data review");
      const dataReviewById = await Review.findAll({
        where: {
          MovieId: id,
        },
      });
      // console.log(dataReviewById);
      console.log("masuk edit by id cuy");

      if (!dataReviewById) {
        throw { message: "Not Found" };
      }

      res.status(200).json(dataReviewById);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteReviewById(req, res) {
    try {
      const { id } = req.params;

      await Review.destroy({ where: { id } });
      res.status(200).json({ message: "Success Delete Review" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async EditReviewById(req, res) {
    try {
      const { id } = req.params;
      console.log(req.body, "edit controller");
      const { name, headline, review, UserId, MovieId } = req.body;

      let dataEditReview = await Review.findByPk(id);
      if (!dataEditReview) {
        throw { name: "NotFound" };
      }
      await dataEditReview.update({ name, headline, review, UserId, MovieId });
      res.status(200).json({
        MovieId: dataEditReview.MovieId,
        message: `Review has been updated!`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getEditById(req, res) {
    try {
      console.log("masuk");
      const { id } = req.params;
      const dataReviewById = await Review.findOne({
        where: {
          id,
        },
      });

      console.log("masuk getEditById controller");

      if (!dataReviewById || dataReviewById.length === 0) {
        throw { message: "Not Found" };
      }

      res.status(200).json(dataReviewById);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async upgradeAccountPayment(req, res) {
    try {
      
      let user = await User.findByPk(req.user.id);
      console.log(req.user.id, "upgrade account di controller");

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: MIDTRANS_API_SERVER,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDER-ID-ETHEREAL-MOVIES" + Math.floor(100000000 + Math.random() * 9000000),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async updateStatusUser(req, res) {
    try {
      const { id } = req.params;

      let findUserId = await User.findByPk(id);
      if (!findUserId) {
        throw { name: "NotFound" };
      }
      await findUserId.update({ status: "premium"});

      let findUserUpdated = await User.findByPk(id);

      res.status(200).json({
        status: findUserUpdated.status ,
        message: `status has been upgarde to premium!`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
