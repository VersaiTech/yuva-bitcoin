const express = require("express");
const router = express.Router();
const {createOrder,getAllOrder} = require("../controllers/Order.Controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');


router.route("/createOrder").post(ValidMember, createOrder); //
router.route("/getAllOrder/:page_number?/:count?").get(isAdmin, getAllOrder); 

module.exports = router;
