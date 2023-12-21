const express = require('express');
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const movie = express.Router()

// endpoint 
movie.use(authentication)
movie.get("/movie", Controller.getMovies);
movie.get("/movie/:id", Controller.getDetailMovieById);
movie.post("/movie/add/review/:id", Controller.postReview);
movie.get("/movie/detail/review/:id", Controller.getReviewById);
movie.delete("/movie/review/delete/:id", Controller.deleteReviewById);
movie.put("/movie/review/edit/:id", Controller.EditReviewById);
movie.get("/movie/review/:id", Controller.getEditById);



module.exports = movie