const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController')
const CampaignController = require('../controllers/campaignController')

const authentication = require('../middlewares/authentication')
const usersRouter = require("./users");
const balancehistoriesRouter = require("./balancehistories");


router.post('/callback/invoice', AuthController.createDepositInvoice);


router.post('/login', AuthController.postLogin);
router.post('/register', AuthController.postRegister);
router.post('/google-login', AuthController.googleLogin);

router.use(authentication)

router.get('/campaigns', CampaignController.getList);
router.post('/campaigns', CampaignController.postCampaign);
router.get('/campaigns/:id', CampaignController.getDetailCampaign);
router.put('/campaigns/:id', CampaignController.putCampaign);
router.delete('/campaigns/:id', CampaignController.deleteCampaign);
router.post('/campaigns/:campaign_id/transaction', CampaignController.postCreateTransaction);


router.post('/invoice', AuthController.createInvoice);
router.get('/user-information', AuthController.userInformation);

router.use('/users', usersRouter);
router.use('/balance-histories', balancehistoriesRouter);


module.exports = router;
