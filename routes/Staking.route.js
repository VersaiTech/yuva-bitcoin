const express = require("express");
const router = express.Router();
const { 
    stakingSummary,transferToStaking,transferToWallet} = require("../controllers/Staking.controller");
const {ValidMember, isAdmin} = require('../middleware/Auth.middleware');

// router.route("/").get(getStakingData).post(ValidMember, stakingRequest);
router.route("/Summary").get(ValidMember,stakingSummary);
router.route("/transferToStaking").post(ValidMember,transferToStaking);
router.route("/transferToWallet").post(ValidMember,transferToWallet);

module.exports = router;
