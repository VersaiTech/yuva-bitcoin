const express = require('express');
const router = express.Router();

const { register,login,getRegister,adminRegister,adminLogin } = require('../controllers/Auth.controller');


// User LOGIN and Register
router.post('/register', register).get('/register', getRegister); //
router.post('/login', login);//

//Admin Login adn Register
router.post('/admin-register', adminRegister) //
router.post('/admin-login', adminLogin) //


module.exports = router;