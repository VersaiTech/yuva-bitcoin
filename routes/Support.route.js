const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

const { createSupport,adminReplyToUser,getAllSupport,getSupportForOneUser} = require("../controllers/Support.Controller");


router.route('/createSupport').post(ValidMember, createSupport);
router.route('/adminReplyToUser/:userId').post(isAdmin, adminReplyToUser);
router.route('/getAllSupport/:page_number?/:count?').get(isAdmin, getAllSupport);
router.route('/getSupportForOneUser/:userId/:page_number?/:count?').get(isAdmin, getSupportForOneUser);

module.exports = router;
