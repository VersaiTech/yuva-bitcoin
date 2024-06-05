const express = require("express");
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');
const { grantPermission, agentHandler,adminSetValue,getPermission ,getSetValue,getSetValueLatest} = require('../controllers/Permission.Controller');

router.route('/grantPermission').post(isAdmin, grantPermission);
router.route('/agentHandler/:admin_user_id').post(isAdmin, agentHandler);
router.route('/setValue').post(isAdmin, adminSetValue);
router.route('/getPermission').get(isAdmin, getPermission);
router.route('/getSetValue').get(isAdmin, getSetValue);
router.route('/getSetValueLatest').get(isAdmin, getSetValueLatest);

module.exports = router