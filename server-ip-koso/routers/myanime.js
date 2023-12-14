const express = require("express");
const controllerMyAnime = require("../controllers/controllerMyAnime");
const myanime = express.Router();

myanime.get("/", controllerMyAnime.getMyAnime);
myanime.post("/addfav/:id", controllerMyAnime.addFav);
myanime.delete("/delete/:id", controllerMyAnime.deleteMyAnime);

module.exports = myanime;
