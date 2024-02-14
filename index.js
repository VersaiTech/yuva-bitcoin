const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const { Connection } = require("./config/db.config");
require("dotenv").config();



const userController = require('./controllers/UserController');
const taskController = require('./controllers/TaskController');
const assignedTaskController = require('./controllers/AssignedTaskController');

const {User} = require('./models/Task');
const {Task} = require('./models/Task');



const port = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 

// const db = require('./config/db.config.js');

app.use('/api/Auth', require('./routes/Auth.route'));
app.use('/api/Dashboard', require('./routes/Dashboard.route'));
app.use('/api/Staking', require('./routes/Staking.route'));
app.use('/api/Team', require('./routes/Team.route'));
app.use('/api/Earning', require('./routes/Earning.route'));
app.use('/api/Withdraw', require('./routes/Withdraw.route'));
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });


app.post('/users', userController.addUser);

app.post('/tasks', taskController.addTask);
  

// User routes
app.get('/users/:userId', userController.getUserById);

// Task routes
app.get('/tasks', taskController.getAllTasks);

// AssignedTask routes
app.post('/assign-task', assignedTaskController.assignTask);
app.post('/mark-task-completed/:assignedTaskId', assignedTaskController.markTaskCompleted);
app.post('/confirm-task-completion/:assignedTaskId', assignedTaskController.confirmTaskCompletion);


app.post('/post-tweet', assignedTaskController.postTweet);

app.get('/user-info', assignedTaskController.getUserInfo);

app.delete('/delete-tweet/:tweetId', assignedTaskController.deleteTweet);



//Database
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

//listening
app.listen(5000, (req, res) => {
  console.log("=== Server is Listening on " + 5000 + " Port ===");
});