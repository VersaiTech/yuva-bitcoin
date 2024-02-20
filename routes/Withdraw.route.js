const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require("../middleware/Auth.middleware");
const { withdrawRequest, getWithdrawRequests, updateWithdrawalStatus,getUserWithdraws,getWithdrawApproved,getWithdrawRejected } = require("../controllers/Withdraw.controller");

router.route('/Request').post(ValidMember, withdrawRequest);
router.route('/updateWithdrawalStatus/:with_referrance').post(isAdmin, updateWithdrawalStatus);
router.route('/getWithdrawRequests').get(isAdmin, getWithdrawRequests);
router.route('/getWithdrawApproved').get(isAdmin, getWithdrawApproved);
router.route('/getWithdrawRejected').get(isAdmin, getWithdrawRejected);
router.route('/getUserWithdraws').get(ValidMember, getUserWithdraws);

module.exports = router;

