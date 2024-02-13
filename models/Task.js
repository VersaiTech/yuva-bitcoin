const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    twitterId: { type: String, unique: true },
    coins: { type: Number, default: 0 },
});

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    coinReward: { type: Number, required: true },
});


const assignedTaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    dateAssigned: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    twitterId: { type: String, unique: true , required: true, ref: 'User'},
    adminConfirmed: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);
const AssignedTask = mongoose.model('AssignedTask', assignedTaskSchema);


module.exports = { User, Task, AssignedTask };