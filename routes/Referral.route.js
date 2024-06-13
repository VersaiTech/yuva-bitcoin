const express = require("express");
const router = express.Router();
const { getAllReferral ,getUserReferral,getReferralForUser} = require("../controllers/Referral.Controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');


router.route("/getAllReferral/:page_number?/:count?").get(isAdmin, getAllReferral);
router.route("/getUserReferral/:user_id").get(isAdmin, getUserReferral);
router.route("/getReferralForUser").get(ValidMember, getReferralForUser);


module.exports = router;