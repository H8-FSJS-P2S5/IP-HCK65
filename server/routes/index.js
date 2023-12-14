const express = require('express');
// const sgMail = require("@sendgrid/mail");
const router = express.Router();

const AuthController = require('../controllers/authController')
const CampaignController = require('../controllers/campaignController')

const authentication = require('../middlewares/authentication')
const {adminOnly} = require('../middlewares/authorization')
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

router.get('/', async function (req, res, next) {
    try {
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        // const msg = {
        //     to: 'dityaksm21@gmail.com', // Change to your recipient
        //     from: 'gemaakbarkusuma@gmail.com', // Change to your verified sender
        //     subject: 'Sending with SendGrid is Fun',
        //     text: 'and easy to do anywhere, even with Node.js',
        //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        // }
        // await sgMail.send(msg)
        // console.log('Email sent')


        res.send("Hello World");
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;
