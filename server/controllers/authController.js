const {validatePassword, signToken} = require('../helpers')
const {User, BalanceHistory} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const {Invoice: InvoiceClient} = require("xendit-node");

const transactionBalanceDeposit = 1;
const transactionBalanceBuy = 2;

class AuthController {

    static async postRegister(req, res, next) {
        try {
            let errors = [];
            let {fullName, email, password} = req.body;
            if (!email) errors.push("Email is required")
            if (!password) errors.push("Password is required")
            if (!fullName) errors.push("Full Name is required")

            if (errors.length > 0) throw {name: "Validation", message: errors}

            let user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                throw {name: "Validation", message: ["Email Already Registered"]};
            }
            user = await User.create({
                fullName, email, password
            });

            return res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async postLogin(req, res, next) {
        try {
            let {email, password} = req.body
            let errors = [];
            if (!email) errors.push("Email is required")
            if (!password) errors.push("Password is required")
            if (errors.length > 0) throw {name: "Validation", message: errors}

            let user = await User.findOne({where: {email}})
            if (!user) throw {name: "InvalidToken", message: "Invalid email/password"}

            let isValidatePassword = validatePassword(password, user.password)
            if (!isValidatePassword) throw {name: "InvalidToken", message: "Invalid email/password"}

            let access_token = signToken({id: user.id})

            res.status(200).json({access_token});
        } catch (error) {
            next(error)
        }
    }

    static async userInformation(req, res, next) {
        try {
            console.log(req.user)
            res.status(200).json({
                data: {
                    id: req.user.id,
                    role: req.user.role,
                    email: req.user.email,
                    balance: req.user.balance,
                }
            });
        } catch (error) {
            next(error)
        }
    }


    static async createInvoice(req, res, next) {
        try {
            let {amount} = req.body
            const xenditInvoiceClient = new InvoiceClient({secretKey: process.env.API_KEY})

            let data = {
                "amount": amount,
                "invoiceDuration": 172800,
                "externalId": req.user.id.toString(),
                "description": "Invoice Deposit Saldo",
                "currency": "IDR",
                "reminderTime": 1,
                "successRedirectUrl": "https://phase2-gema-ip.web.app/balance-histories",
            }

            data = await xenditInvoiceClient.createInvoice({
                data
            })

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createDepositInvoice(req, res, next) {
        try {
            let {external_id, paid_amount} = req.body

            let balanceHistories = await BalanceHistory.create({
                transaction_type: transactionBalanceDeposit,
                user_id: external_id,
                total: paid_amount,
            });

            await User.increment({balance: paid_amount}, {where: {id: external_id}})

            res.json({data: balanceHistories})
        } catch (error) {
            next(error)
        }
    }


    static async googleLogin(req, res, next) {
        try {
            const {token} = req.body
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {email: payload.email},
                defaults: {
                    email: payload.email,
                    fullName: payload.name,
                    password: null,
                }
            });

            let access_token = signToken({id: user.id})

            return res.json({data: {access_token}})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;
