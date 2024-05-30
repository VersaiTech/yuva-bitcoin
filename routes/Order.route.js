const express = require("express");
const router = express.Router();
const { createOrder, updateOrder, getAllOrder, getAllOrderForOneUSer,getAAllOrder,getAAllBuyOrder, getOrdersForAdminForOneUser, deleteOrder, createBuyOrder
    // ,updateBuyOrder
    ,getAllBuyOrder,getAllBuyOrderForOneUSer,getBuyOrdersForAdminForOneUser,findMemberOrder } = require("../controllers/Order.Controller");
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');


router.route("/createOrder").post(ValidMember, createOrder); //
router.route("/updateOrder").post(ValidMember, updateOrder); //
router.route("/getAllOrder/:page_number?/:count?").get(isAdmin, getAAllOrder);
router.route("/getAllOrderForAll/:page_number?/:count?").get(getAllOrder); 
router.route("/getAllOrderForOneUSer/:page_number?/:count?").get(ValidMember, getAllOrderForOneUSer);
router.route("/getOrdersForAdminForOneUser/:userId/:page_number?/:count?").get(isAdmin, getOrdersForAdminForOneUser);
router.route("/deleteOrder").delete(ValidMember, deleteOrder)


router.route("/createBuyOrder/:_id").post(ValidMember, createBuyOrder);
// router.route("/updateBuyOrder/:_id").post(ValidMember, updateBuyOrder);
router.route("/getAllBuyOrder/:page_number?/:count?").get(isAdmin, getAAllBuyOrder);
router.route("/getAllBuyOrderForAll/:page_number?/:count?").get( getAllBuyOrder);
router.route("/getAllBuyOrderForOneUSer/:page_number?/:count?").get(ValidMember, getAllBuyOrderForOneUSer);
router.route("/getBuyOrdersForAdminForOneUser/:userId/:page_number?/:count?").get(isAdmin, getBuyOrdersForAdminForOneUser);

router.route("/findMemberOrder").post(isAdmin, findMemberOrder);
module.exports = router;
