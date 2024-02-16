const express = require("express");
const router = express.Router();
const { getStakingData , stakingRequest ,stakingSummary,transferToStaking} = require("../controllers/Staking.controller");
const {ValidMember} = require('../middleware/Auth.middleware');

router.route("/").get(getStakingData).post(ValidMember, stakingRequest);
router.route("/Summary").get(ValidMember,stakingSummary);
router.route("/transferToStaking").post(ValidMember,transferToStaking);

module.exports = router;
