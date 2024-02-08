const express = require('express');
const router = express.Router();

const { register,login,getRegister } = require('../controllers/Auth.controller');

router.post('/register', register).get('/register', getRegister);
router.post('/login', login);

module.exports = router;