const express = require("express");
const router = express.Router();
const {
    createDeposit, getAllDepositsForAdmin, getDepositsForUser,convertDepositToCoins,convertHistoryUser,convertHistoryAdmin } = require("../controllers/deposit.controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

// router.route("/").get(getStakingData).post(ValidMember, stakingRequest);
router.route("/createDeposit").post(ValidMember, createDeposit);  //
router.route("/getDepositsForUser/:page_number?/:count?").get(ValidMember, getDepositsForUser);
router.route("/getAllDepositsForAdmin/:page_number?/:count?").get(isAdmin, getAllDepositsForAdmin);
router.route("/convertDepositToCoins").post(ValidMember, convertDepositToCoins); //
router.route("/convertHistoryUser/:page_number?/:count?").get(ValidMember, convertHistoryUser);
router.route("/convertHistoryAdmin/:page_number?/:count?").get(isAdmin, convertHistoryAdmin);


module.exports = router;
