const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

const { createSupport, adminReplyToUser, getAllSupport, getSupportForOneUser,getUserSupport,deleteDeposit,getAllReply,getOneReply,getUserReply } = require("../controllers/Support.Controller");


router.route('/createSupport').post(ValidMember, createSupport);
router.route('/adminReplyToUser/:supportTicketId').post(isAdmin, adminReplyToUser);
router.route('/getAllSupport/:page_number?/:count?').get(isAdmin, getAllSupport);
router.route('/getSupportForOneUser/:userId/:page_number?/:count?').get(isAdmin, getSupportForOneUser);
router.route('/getUserSupport/:page_number?/:count?').get(ValidMember, getUserSupport);
router.route('/deleteSupport/:supportTicketId').delete(isAdmin, deleteDeposit);
router.route('/getAllReply/:page_number?/:count?').get(isAdmin, getAllReply);
router.route('/getOneReply/:userId/:page_number?/:count?').get(isAdmin, getOneReply);
router.route('/getUserReply/:page_number?/:count?').get(ValidMember, getUserReply);

module.exports = router;
 