const express = require("express");
const router = express.Router();
const { getStakingData , stakingRequest ,stakingSummary} = require("../controllers/Staking.controller");
const {ValidMember} = require('../middleware/Auth.middleware');

router.route("/").get(getStakingData).post( ValidMember, stakingRequest);
router.route("/Summary").get(ValidMember,stakingSummary);

module.exports = router;
