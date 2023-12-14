const express = require('express');
const BalanceHistoryController = require("../controllers/balanceHistoryController");
const router = express.Router();

router.get('/', BalanceHistoryController.listBalanceHistories);
router.post('/', BalanceHistoryController.postTransactionDeposit);

module.exports = router;
