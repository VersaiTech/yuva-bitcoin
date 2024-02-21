const express = require("express");
const router = express.Router();
const {
    createDeposit, getAllDepositsForAdmin, getDepositsForUser, } = require("../controllers/deposit.controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

// router.route("/").get(getStakingData).post(ValidMember, stakingRequest);
router.route("/getDepositsForUser").get(ValidMember, getDepositsForUser);
router.route("/getAllDepositsForAdmin").get(isAdmin, getAllDepositsForAdmin);
router.route("/createDeposit").post(ValidMember, createDeposit);

module.exports = router;
