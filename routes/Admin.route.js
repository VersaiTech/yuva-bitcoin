const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'public/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});



const upload = multer({ storage: storage });
const { getOverview } = require('../controllers/Overview.controller');
const { getuserbalance,getAllStakes,getAllStake, addTask, editTask, deleteTask,deleteManyTasks, getOneTask,deleteUser, getAllTasks, completeTask, confirmTaskCompletion, getMemberByUserId, updateMemberStatus, getAllMembers, getActiveMembers, getBlockedMembers, getPendingTasks, getCompletedTasks,getConfirmedTasksForUser,getPendingTasksForUser,getRejectedTasksForUser,getAllTasksUser } = require('../controllers/AdminController');
const { ValidMember, isAdmin } = require('../middleware/Auth.middleware');

router.route('/addTask').post(isAdmin, upload.array('file', 10), addTask);
router.route('/getAllTasks').get(ValidMember, getAllTasks);
router.route('/getAllTasksUser').get(ValidMember, getAllTasksUser);
router.route('/getConfirmedTasksForUser').get(ValidMember, getConfirmedTasksForUser);
router.route('/getPendingTasksForUser').get(ValidMember, getPendingTasksForUser);
router.route('/getRejectedTasksForUser').get(ValidMember, getRejectedTasksForUser);
router.route('/getOneTask/:taskId').get(isAdmin, getOneTask);
router.route('/getAllTasksAdmin').get(isAdmin, getAllTasks);
router.route('/editTask/:taskId').post(isAdmin, upload.array('file', 10), editTask);
router.route('/deleteTask/:taskId').delete(isAdmin, deleteTask);
router.route('/deleteManyTasks').delete(isAdmin, deleteManyTasks);

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
router.route("/getAllStake").get(ValidMember, getAllStake);

router.route("/getOverview").get(isAdmin, getOverview);

router.route("/getuserbalance").get(ValidMember, getuserbalance);

module.exports = router;