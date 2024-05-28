const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

const { createExternalSwap, adminApproval, getAllExternalSwap, findExternalSwap, transferYuva } = require("../controllers/ExternalSwap.controller");


router.route("/createExternalSwap").post(createExternalSwap);
router.route("/adminApproval/:orderId").post(isAdmin, adminApproval);
router.route("/getAllExternalSwap").get(isAdmin, getAllExternalSwap);
router.route("/findExternalSwap").post(findExternalSwap);
router.route("/transferYuva").post( transferYuva);

module.exports = router