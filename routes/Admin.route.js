const express = require('express');
const router = express.Router();
const multer = require("multer");
// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getOverview } = require('../controllers/Overview.controller');
const { getAllStakes, addTask, editTask, deleteTask, getOneTask,deleteUser, getAllTasks, completeTask, confirmTaskCompletion, getMemberByUserId, updateMemberStatus, getAllMembers, getActiveMembers, getBlockedMembers, getPendingTasks, getCompletedTasks,getConfirmedTasksForUser,getPendingTasksForUser } = require('../controllers/AdminController');
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

router.route('/addTask').post(isAdmin, upload.array('file', 10), addTask);
router.route('/getAllTasks').get(ValidMember, getAllTasks);
router.route('/getConfirmedTasksForUser').get(ValidMember, getConfirmedTasksForUser);
router.route('/getPendingTasksForUser').get(ValidMember, getPendingTasksForUser);
router.route('/getOneTask/:taskId').get(isAdmin, getOneTask);
router.route('/getAllTasksAdmin').get(isAdmin, getAllTasks);
router.route('/editTask').post(isAdmin, upload.array('file', 10), editTask);
router.route('/deleteTask/:taskId').delete(isAdmin, deleteTask);

router.route('/getPendingTasks').get(isAdmin, getPendingTasks);
router.route('/getCompletedTasks').get(isAdmin, getCompletedTasks);

router.route('/completeTask').post(ValidMember, completeTask);
router.route('/confirmTaskCompletion').post(isAdmin, confirmTaskCompletion);

router.route('/updateMemberStatus/:member_user_id').post(isAdmin, updateMemberStatus);
router.route('/deleteUser/:member_user_id').delete(isAdmin, deleteUser);

router.route('/getMemberByUserId/:member_user_id').get(isAdmin, getMemberByUserId);
router.route('/getAllMembers').get(isAdmin, getAllMembers);
router.route('/getActiveMembers').get(isAdmin, getActiveMembers);
router.route('/getBlockedMembers').get(isAdmin, getBlockedMembers);

router.route("/getAllStakes").get(isAdmin, getAllStakes);

router.route("/getOverview").get(isAdmin, getOverview);

module.exports = router;