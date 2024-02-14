const express = require("express");
const router = express.Router();
const { ValidMember } = require("../middleware/Auth.middleware");
const {withdrawRequest , getWithdrawRequests}  = require("../controllers/Withdraw.controller");

router.route('/Request').post(ValidMember , withdrawRequest);
router.route('/Summary').get(ValidMember , getWithdrawRequests);

module.exports = router;

