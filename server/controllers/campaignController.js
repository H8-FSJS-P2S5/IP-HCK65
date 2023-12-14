const {validatePassword, signToken} = require('../helpers')
const {Campaign, User, Transaction, BalanceHistory} = require('../models')

const transactionBalanceDeposit = 1;
const transactionBalanceBuy = 2;

class CampaignController {

    static async getList(req, res, next) {
        try {
            let campaigns = await Campaign.findAll({
                order: [
                    // Will escape title and validate DESC against a list of valid direction parameters
                    ['id', 'ASC'],
                ]
            })

            res.status(200).json({
                data: campaigns
            });
        } catch (error) {
            next(error)
        }
    }

    static async postCampaign(req, res, next) {
        try {
            console.log('aa')
            let {title, description, total_fundraising, image_1, image_2, image_3} = req.body;
            let remaining_balance = total_fundraising
            let campaign = await Campaign.create({
                title,
                description,
                total_fundraising,
                image_1,
                image_2,
                image_3,
                remaining_balance
            })

            res.status(201).json({data: campaign});
        } catch (error) {
            next(error)
        }
    }


    static async getDetailCampaign(req, res, next) {
        try {
            let {id} = req.params;
            let campaign = await Campaign.findOne({
                where: {id},
            });

            res.status(200).json({data: campaign});
        } catch (error) {
            next(error)
        }
    }

    static async putCampaign(req, res, next) {
        try {
            let {id} = req.params;

            let {title, description, total_fundraising, image_1, image_2, image_3} = req.body;
            let errors = [];

            if (!title) errors.push("Please enter your title")
            if (!description) errors.push("Please enter your description")
            if (!total_fundraising) errors.push("Please enter your total fundraising")
            if (!image_1 || !image_2 || !image_3) errors.push("Please enter your image URL")

            if (errors.length > 0) throw {name: "Validation", message: errors, status: 400}

            let campaign = await Campaign.findOne({
                where: {
                    id
                }
            })

            if (!campaign) throw {name: "NotFound", message: "error not found", status: 404}

            let remaining_balance = total_fundraising

            campaign = await campaign.update({
                title,
                description,
                total_fundraising,
                image_1,
                image_2,
                image_3,
                remaining_balance
            })

            res.status(200).json(campaign);
        } catch (error) {
            next(error)
        }
    }


    static async deleteCampaign(req, res, next) {
        try {
            let {id} = req.params;
            let campaign = await Campaign.findByPk(id);

            if (!campaign) throw {name: "NotFound", message: "error not found", status: 404}

            await campaign.destroy();

            res.status(200).json({message: `${campaign.title} success to delete`});
        } catch (error) {
            next(error)
        }
    }


    static async postCreateTransaction(req, res, next) {
        try {
            let {campaign_id} = req.params
            /*
                 1. validasi balancenya apakah cukup atau tidak
                 2. create transaction ke Table Transaction
                 3. kurangin balance di Table User
                 4.  create history balance di Table BalanceHistory
             */

            let user = await User.findOne({
                where: {
                    id: req.user.id
                }
            });
            let total = req.body.total;
            total = total.replace('Rp.', '');
            total = total.split('.');
            let newTotal = "";
            for (let i in total) {
                newTotal += total[i];
            }
            newTotal = Number(newTotal);
            // 1. validasi saldonya apakah cukup atau tidak
            if (newTotal > user.balance) {
                throw {name: "Validation", message: ["Saldo tidak mencukupi"]};
            } else if (newTotal === 0) {
                throw {name: "Validation", message: ["Nilai Investasi harus diisi"]};
            } else {
                let tempObj = {
                    total: newTotal,
                    user_id: req.user.id,
                    campaign_id: req.params.campaign_id,
                }

                // 2. create transaction ke Table Transaction
                await Transaction.create(tempObj);

                // 3. kurangin balance di Table User
                await User.increment({balance: -newTotal}, {where: {id: req.user.id}})
                await Campaign.increment({remaining_balance: -newTotal}, {where: {id: campaign_id}})

                tempObj = {
                    transaction_type: transactionBalanceBuy,
                    user_id: req.user.id,
                    total: newTotal,
                    date: new Date(),
                };

                // 4.  create history balance di Table BalanceHistory
                await BalanceHistory.create(tempObj);
                res.json({data: "sucess"})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CampaignController;
