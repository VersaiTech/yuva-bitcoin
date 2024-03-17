const express = require("express");
const router = express.Router();
const { createOrder, updateOrder, getAllOrder, getAllOrderForOneUSer, getOrdersForAdminForOneUser, deleteOrder } = require("../controllers/Order.Controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');


router.route("/createOrder").post(ValidMember, createOrder); //
router.route("/updateOrder").post(ValidMember, updateOrder); //
router.route("/getAllOrder/:page_number?/:count?").get(isAdmin, getAllOrder);
router.route("/getAllOrderForOneUSer/:page_number?/:count?").get(ValidMember, getAllOrderForOneUSer);
router.route("/getOrdersForAdminForOneUser/:userId/:page_number?/:count?").get(isAdmin, getOrdersForAdminForOneUser);
router.route("/deleteOrder").delete(ValidMember, deleteOrder)

module.exports = router;