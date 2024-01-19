const { authentication } = require('../middlewares/authentication');
const itemRouter = require('./item');
const userRouter = require('./user');
const router = require('express').Router()

router.use(userRouter)
router.use(authentication)

router.use(itemRouter)

module.exports = router;