const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/Auth.middleware");
const { MyReferral, MyTeam } = require("../controllers/Team.controller");

router.route("/MyReferral").get(verifyToken, MyReferral);

router.route("/MyTeam").get(verifyToken, MyTeam);

module.exports = router;
