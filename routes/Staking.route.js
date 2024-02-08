const express = require("express");
const router = express.Router();
const { getStakingData , stakingRequest ,stakingSummary} = require("../controllers/Staking.controller");
const {verifyToken} = require('../middleware/Auth.middleware');

router.route("/").get(getStakingData).post( verifyToken, stakingRequest);
router.route("/Summary").get(verifyToken,stakingSummary);

module.exports = router;
