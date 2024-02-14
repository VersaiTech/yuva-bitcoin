const express = require('express');
const router = express.Router();

const {addTask, getAllTasks, completeTask,confirmTaskCompletion } = require('../controllers/TaskController');
const {ValidMember, isAdmin} = require('../middleware/Auth.middleware');

router.route('/addTask').post(isAdmin, addTask);
router.route('/getAllTasks').get(ValidMember, getAllTasks);
router.route('/completeTask').post(ValidMember, completeTask);
router.route('/confirmTaskCompletion').post(isAdmin, confirmTaskCompletion);

// router.post('/register', register).get('/register', getRegister);
// router.post('/login', login);


// router.post('/admin-register', adminRegister)
// router.post('/admin-login', adminLogin)


module.exports = router;