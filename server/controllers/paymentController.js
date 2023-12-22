const midtransClient = require('midtrans-client')
// const {nanoid} = require('nanoid')
const {Order} = require('../models')

class PaymentController {
    static async inititateMidtransTrx(req, res) {
        try {
            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : `SB-Mid-server-PfxQnJUXtDA8RCzg8qKEtnK2`
            })

            const orderId = `TRX-au-${Math.random().toString()}`
            const trxAmount = 20_000_000
            const transaction = await snap.createTransaction({
                "transaction_details" : {
                    "order_id" : orderId,
                    "gross_amount" : trxAmount
                },
                "credit_card" : {
                    "secure" : true
                }, 
                "customer_details" : {
                    "email" : req.user.email
                }
            })

            await Order.create({
                orderId,
                userId : req.user.id,
                amount : trxAmount
            })

            res.json({token : transaction.token, orderId})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PaymentController