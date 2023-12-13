const axios = require("axios");
// const { Xendit, Invoice: InvoiceClient } = require("xendit-node");
// const { CreateInvoiceRequest, Invoice } = require("xendit-node/invoice/models");
const { Transaction, User } = require("../models");
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

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
      // console.log("MASUK");

      //   const UserId = req.user.id;
      const UserId = 1; //dari req.user.id

      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      const now = new Date();
      const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
      const transaction_id = `TRX-UACC-asde44zdf24-${formattedDate}`;
      if (!findUser) throw { name: "notFound" };
      // console.log(findUser.Transactions[0], "ENIH");

      if (findUser.status === "Premium") throw { name: "notFound" }; //GANTI KE ALERT UDAH PREMIUM, GABAKAL SIH

      if (findUser.Transactions.length > 0) {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
            url: "UDAH EXPIRED TARO KONFIRMASI LAGI KE USER, MUNGKIN BUAT HALAMANNYA",
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            url: "UDAH BAYAR BALIKIN LANGSUNG KE HOMEPAGE, UBAH STATUS JADI PREMIUM",
          });
        }
      } else {
        const session = await stripe.checkout.sessions.create({
          success_url: "http://localhost:5000/", //balikkan ke url client atau endpoint mengakses home
          cancel_url: "http://localhost:5000/", //balikkan ke url client atau endpoint mengakses home
          line_items: [
            //NANTI REQ.BODY, PASTIKAN DIKIRM KE REQ.BODY
            {
              price_data: {
                currency: "idr",
                product_data: {
                  name: "Upgrade Account to Premium chuni",
                },
                unit_amount: 15_000_00, //NGITUNG DARI SEN, RP 150.000,00
              },
              quantity: 1, //CUMA UPGRADE DOANG
            },
          ],
          mode: "payment",
          customer_email: findUser.email, //GANTI DENGAN EMAIL USER DARI FINDUSER
        });

        const payment_gateway_id = session.id;

        await Transaction.create({
          UserId,
          transaction_id,
          payment_gateway_id,
          status: `${session.payment_status}`,
        });

        // res.status(200).json({ session });
        res.status(200).json({ url: session.url }); //YANG DI RETURN CUKUP URL AJA, NANTI LANGSUNG DI PAKSA CLIENT KE URL PAKE WINDOW
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgradeAcc(req, res, next) {
    try {
      const UserId = 1; //dari req.user.id
      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      if (!findUser) throw { name: "notFound" };
      if (findUser.status === "Premium") throw { name: "notFound" }; //GANTI KE ALERT UDAH PREMIUM, GABAKAL SIH
      if (findUser.Transactions[0].status === "unpaid") {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
            url: "UDAH EXPIRED TARO KONFIRMASI LAGI KE USER, MUNGKIN BUAT HALAMANNYA",
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            url: "UDAH BAYAR BALIKIN LANGSUNG KE HOMEPAGE, UBAH STATUS JADI PREMIUM",
          });
        }
      } else {
        await findUser.update({ status: "Premium" });
        await findUser.Transactions[0].update({ status: "paid" });
        res
          .status(200)
          .json({ message: "Upgrade success, you are now a Premium user" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerGlobal;
