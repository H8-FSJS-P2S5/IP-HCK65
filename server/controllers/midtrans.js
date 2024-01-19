const midtransClient = require("midtrans-client");
const {nanoid} = require('nanoid')
const { Cart } = require('../models')

class MidtransController {
  static async getMidtransToken(req, res, next) {
    try {
      let quantity = [];
      const initialValue = 0
      const item = await Cart.findAll();
      
      item.map(e => {
        let price = e.dataValues.price
        quantity.push(price)

        return [quantity]
      });

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const orderId = `trx-ua-${nanoid()}`;

      const { token } = await snap.createTransaction({
        transaction_details: {
          order_id: orderId, // ua = upgrade account
          gross_amount: quantity.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
          ) // ini tergantung product + pajak
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user.name,
          email: req.user.email,
        },
      });
      
      // let transactionToken = transaction.token;
      // console.log("transactionToken:", { transaction });

      res.json({ transaction_token: token, orderId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MidtransController;
