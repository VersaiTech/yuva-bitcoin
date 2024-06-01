const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');
const { grantPermission, agentHandler } = require('../controllers/Permission.Controller');

router.route('/grantPermission').post(isAdmin, grantPermission);
router.route('/agentHandler/:admin_user_id').post(isAdmin, agentHandler);

module.exports = router