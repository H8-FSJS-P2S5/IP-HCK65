const express = require('express');
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const InvoiceController = require('../controllers/controller');
const invoiceController = new InvoiceController();
const {Invoice: InvoiceClient, Payout: PayoutClient} = require('xendit-node')
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

router.post('/api/invoice', async function (req, res, next) {
    try {
        const xenditInvoiceClient = new InvoiceClient({secretKey: process.env.API_KEY})

        const xenditPayoutClient = new PayoutClient({secretKey: process.env.API_KEY})

        let data = {
            "amount": 10000,
            "invoiceDuration": 172800,
            "externalId": "test1234",
            "description": "Test Invoice",
            "currency": "IDR",
            "reminderTime": 1,
            "successRedirectUrl": "https://www.google.com/",
        }

        data = await xenditInvoiceClient.createInvoice({
            data
        })
        res.json(data)


        // https://checkout-staging.xendit.co/v2/65781dea4dc83903b0173f24
        // https://checkout-staging.xendit.co/v2/65781ea1ea91e11f1abff324

        // const response = await xenditInvoiceClient.getInvoiceById({
        //     invoiceId: "65781dea4dc83903b0173f24"
        // })
        //
        // res.json(response)


        // const data = {
        //     "amount" : 90000,
        //     "channelProperties" : {
        //         "accountNumber" : "000000",
        //         "accountHolderName" : "John Doe"
        //     },
        //     "description" : "Test Bank Payout",
        //     "currency" : "PHP",
        //     "type" : "DIRECT_DISBURSEMENT",
        //     "referenceId" : "DISB-001",
        //     "channelCode" : "PH_BDO"
        // }
        //
        // const response = await xenditPayoutClient.createPayout({
        //     idempotencyKey: "DISB-1234",
        //     data
        // })


        // const response = await xenditPayoutClient.getPayoutById({
        //     id: "disb-73e94f43-ea76-4883-9dd1-c6ba9384eaad",
        // })
        //
        // res.json(response)
    } catch (e) {
        console.log('error')
        console.log(e)
        return res.status(e.response.status).send(e.response.data);
    }
});

module.exports = router;
