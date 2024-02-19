const express = require('express');
const router = express.Router();

const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {addTask, editTask, deleteTask, getAllTasks, completeTask,confirmTaskCompletion, getAllMembers,getActiveMembers, getBlockedMembers } = require('../controllers/TaskController');
const {ValidMember, isAdmin} = require('../middleware/Auth.middleware');

router.route('/addTask').post(isAdmin,upload.array('file',10), addTask);
router.route('/getAllTasks').get(ValidMember, getAllTasks);
router.route('/getAllTasksAdmin').get(isAdmin, getAllTasks);
router.route('/editTask').post(isAdmin,upload.array('file', 10),editTask);
router.route('/deleteTask/:taskId').delete(isAdmin,deleteTask);



router.route('/completeTask').post(ValidMember, completeTask);
router.route('/confirmTaskCompletion').post(isAdmin, confirmTaskCompletion);




router.route('/getAllMembers').get(isAdmin, getAllMembers);
router.route('/getActiveMembers').get(isAdmin, getActiveMembers);
router.route('/getBlockedMembers').get(isAdmin, getBlockedMembers);


module.exports = router;