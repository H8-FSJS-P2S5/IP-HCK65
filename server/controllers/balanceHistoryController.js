const {BalanceHistory, User} = require('../models')

const transactionBalanceDeposit = 1;
const transactionBalanceBuy = 2;

class BalanceHistoryController {

    static async listBalanceHistories(req, res, next) {
        try {
            let balanceHistories = await BalanceHistory.findAll({
                where: {
                    user_id: req.user.id
                }
            });
            res.status(200).json({data: balanceHistories});
        } catch (error) {
            next(error)
        }
    }


    static async postTransactionDeposit(req, res, next) {
        try {
            let balance = req.body.balance;
            balance = balance.replace('Rp.', '');
            balance = balance.split('.');
            let newBalance = "";
            for (let i in balance) {
                newBalance += balance[i];
            }


            let balanceHistories = await BalanceHistory.create({
                transaction_type: transactionBalanceDeposit,
                transaction_status: 0,
                user_id: req.user.id,
                total: newBalance,
            });

            await User.increment({balance: newBalance}, {where: {id: req.user.id}})
            res.status(200).json({data: balanceHistories});
        } catch (error) {
            next(error)
        }
    }

}

module.exports = BalanceHistoryController;
