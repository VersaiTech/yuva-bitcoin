const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/Dashboard.controller');
const {verifyToken} = require('../middleware/Auth.middleware');

router.route('/').get(verifyToken , getDashboardData);

module.exports = router;
