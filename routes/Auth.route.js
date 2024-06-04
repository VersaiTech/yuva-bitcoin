const express = require('express');
const router = express.Router();
const { ValidMember, isAdmin } = require("../middleware/Auth.middleware");
const { register, login, getRegister, adminRegister, adminLogin, verifyOTP, deleteAgent, forgotPassword, getAllAgent, verifyOTPForResetPassword, changePassword, verifyOTPAdmin, forgotPasswordAdmin,
    verifyOTPForResetPasswordAdmin } = require('../controllers/Auth.controller');


// User LOGIN and Register
router.post('/register', register).get('/register', getRegister); //
router.post('/verifyOTP', verifyOTP);
router.post('/login', login);//
router.post('/forgotPassword', forgotPassword);
router.post('/verifyOTPForResetPassword', verifyOTPForResetPassword);
router.post('/changePassword', ValidMember, changePassword);


//Admin Login adn Register
router.post('/admin-register', adminRegister) //
router.post('/admin-login', adminLogin) //
router.post('/verifyOTPAdmin', verifyOTPAdmin)
router.get('/getAllAgent', isAdmin, getAllAgent)
router.delete('/deleteAgent', isAdmin, deleteAgent)
router.post('/forgotPasswordAdmin', forgotPasswordAdmin)
router.post('/verifyOTPForResetPasswordAdmin', verifyOTPForResetPasswordAdmin)

module.exports = router;