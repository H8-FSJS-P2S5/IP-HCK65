const express = require("express");
const controllerAnimes = require("../controllers/controllerAnimes");
const animes = express.Router();

animes.get("/", controllerAnimes.getAnimes);
animes.get("/:id", controllerAnimes.getAnime);

module.exports = animes;
