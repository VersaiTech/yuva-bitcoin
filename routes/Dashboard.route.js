const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/Dashboard.controller');
const {ValidMember, isAdmin} = require('../middleware/Auth.middleware');

router.route('/').get(ValidMember, getDashboardData);

module.exports = router;
