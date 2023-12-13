const express = require("express");
const controllerMyAnime = require("../controllers/controllerMyAnime");
const myanime = express.Router();

myanime.get("/", controllerMyAnime.getMyAnime);
myanime.post("/addFav/:id", controllerMyAnime.addFav);

module.exports = myanime;
