const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

const { createSupport,adminReplyToUser} = require("../controllers/Support.Controller");


router.route('/createSupport').post(ValidMember, createSupport);
router.route('/adminReplyToUser/:userId').post(isAdmin, adminReplyToUser);

module.exports = router;
