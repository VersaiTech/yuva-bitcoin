const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require("../middleware/Auth.middleware");
const { withdrawRequest,getWithdrawByUserId, getWithdrawRequests, updateWithdrawalStatus,getUserWithdraws,getWithdrawApproved,getWithdrawRejected,getWithdrawPending } = require("../controllers/Withdraw.controller");

router.route('/Request').post(ValidMember, withdrawRequest);
router.route('/updateWithdrawalStatus/:with_referrance').post(isAdmin, updateWithdrawalStatus);
router.route('/getWithdrawRequests').get(isAdmin, getWithdrawRequests);
router.route('/getWithdrawApproved').get(isAdmin, getWithdrawApproved);
router.route('/getWithdrawPending').get(isAdmin, getWithdrawPending);
router.route('/getWithdrawRejected').get(isAdmin, getWithdrawRejected);
router.route('/getUserWithdraws').get(ValidMember, getUserWithdraws);


router.route('/getWithdrawByUserId/:with_referrance').get(isAdmin, getWithdrawByUserId);

module.exports = router;

