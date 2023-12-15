const express = require('express');
const Controller = require('../controllers/controller');
const movie = express.Router()

// endpoint 
movie.get("/movie", Controller.getMovies);
movie.get("/movie/review/:id", Controller.getDetailMovieById);
movie.post("/movie/add/review/:id", Controller.postReview);
movie.get("/movie/detail/review/:id", Controller.getReviewById);
movie.delete("/movie/review/delete/:id", Controller.deleteReviewById);
movie.put("/movie/review/edit/:id", Controller.EditReviewById);



module.exports = movie