const axios = require("axios");
const { Xendit, Invoice: InvoiceClient } = require("xendit-node");
const { CreateInvoiceRequest, Invoice } = require("xendit-node/invoice/models");
const { Transaction, User } = require("../models");

class ControllerGlobal {
  static async getLaid(req, res, next) {
    try {
      let instance = { mukidi: "WKWKWKW" };
      res.status(201).json(instance);
    } catch (error) {
      next(error);
    }
  }


  static async postPay(req, res, next) {
    try {
      const SECRET_KEY =
        "xnd_development_cR8v2Aq2SHBRrm6dx5MDge5VKMTTQYwzv8MpXROHlrRUnz8RcJSLfJb5hILS4";
      const encodedString = Buffer.from(SECRET_KEY).toString("base64");
      //   console.log(encodedString);

      const xenditClient = new Xendit({ secretKey: SECRET_KEY });
      const { Invoice } = xenditClient;

      const xenditInvoiceClient = new InvoiceClient({
        secretKey: SECRET_KEY,
      });
      //   const UserId = req.user.id;
      //   const findUser = User.findByPk(UserId)
      const now = new Date();
      const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

      const UserId = 1;
      const transaction_id = `TRX-UACC-asde44zdf24-${formattedDate}`;
      const payer_email = "koso@mail.com";

      const data = {
        amount: 10000,
        invoiceDuration: 172800,
        externalId: `${transaction_id}`,
        payer_email: `${payer_email}`,
        description: "Test Invoice",
        currency: "IDR",
      };

      const response = await xenditInvoiceClient.createInvoice({
        data,
      });

      // console.log(response.id);

      const payment_gateway_id = response.id;

      await Transaction.create({
        UserId,
        transaction_id,
        payment_gateway_id,
        Status: `${response.status}`,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async upgradeAcc(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerGlobal;
