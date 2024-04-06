const express = require('express');
const router = express.Router();
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');
const { createDummyData, getDummyData } = require('../controllers/Dummy.Controller');


router.route('/createDummyData').post(isAdmin, createDummyData);
router.route('/getDummyData').get(isAdmin, getDummyData);
router.route('/getDummyDataForAll').get(getDummyData);

module.exports = router;