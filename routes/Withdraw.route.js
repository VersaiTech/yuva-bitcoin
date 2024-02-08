const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/Auth.middleware");
const {withdrawRequest , getWithdrawRequests}  = require("../controllers/Withdraw.controller");

router.route('/Request').post(verifyToken , withdrawRequest);
router.route('/Summary').get(verifyToken , getWithdrawRequests);

module.exports = router;

