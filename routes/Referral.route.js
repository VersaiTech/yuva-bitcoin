const express = require("express");
const router = express.Router();
const { getAllReferral } = require("../controllers/Referral.Controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');


router.route("/getAllReferral").get(isAdmin, getAllReferral);


module.exports = router;