const express = require('express');
const router = express.Router();

const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {addTask, getAllTasks, completeTask,confirmTaskCompletion, getAllMembers } = require('../controllers/TaskController');
const {ValidMember, isAdmin} = require('../middleware/Auth.middleware');

router.route('/addTask').post(isAdmin,upload.array('file',10), addTask);
router.route('/getAllTasks').get(ValidMember, getAllTasks);
router.route('/completeTask').post(ValidMember, completeTask);
router.route('/confirmTaskCompletion').post(isAdmin, confirmTaskCompletion);

router.route('/getAllMembers').get(isAdmin, getAllMembers);

// router.post('/register', register).get('/register', getRegister);
// router.post('/login', login);


// router.post('/admin-register', adminRegister)
// router.post('/admin-login', adminLogin)


module.exports = router;