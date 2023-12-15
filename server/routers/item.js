const ItemController = require('../controllers/item');
const itemRouter = require('express').Router();

itemRouter.get('/foods', ItemController.fetchData)
itemRouter.get('/carts', ItemController.readCart)
itemRouter.post('/foods/:id', ItemController.addToCart)
itemRouter.delete('/carts/:id', ItemController.deleteCart)

module.exports = itemRouter;