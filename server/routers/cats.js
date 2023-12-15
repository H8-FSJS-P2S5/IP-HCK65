const express = require('express')
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authentication')
const cats = express.Router()

cats.get('/', Controller.getCatsData)
cats.post('/', authenticate, Controller.favCatsById)
cats.get('/fav-cats', authenticate, Controller.showFavCats )
cats.delete('/fav-cats/:id', Controller.deleteFavCats)

module.exports = cats