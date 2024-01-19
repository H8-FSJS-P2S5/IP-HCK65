const ItemController = require('../controllers/item');
const MidtransController = require('../controllers/midtrans');
const UserController = require('../controllers/user');
const itemRouter = require('express').Router();

itemRouter.get('/foods', ItemController.fetchData)
itemRouter.get('/carts', ItemController.readCart)
itemRouter.patch('/users/me/upgrade', UserController.upgradeAccount)
itemRouter.get('/payment/midtrans/token', MidtransController.getMidtransToken)
itemRouter.post('/foods/:id', ItemController.addToCart)
itemRouter.delete('/carts/:id', ItemController.deleteCart)

module.exports = itemRouter;