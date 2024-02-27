const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    taskId: { type: String, required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    coins: { type: Number, required: true },
    link: { type: String, required: true },
    imageUrls: { type: [String] },
}, { timestamps: true });


const completedTaskSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'Member' },
    taskId: { type: String, required: true, ref: 'Task' },
    taskName: { type: String, required: true, ref: 'Task' },
    name: { type: String, required: true, ref: 'Member' },
    description: { type: String, required: true, ref: 'Task' },
    link: { type: String, required: true, ref: 'Task' },
    coins: { type: Number, required: true, ref: 'Task' },
    dateCompleted: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'confirmed','rejected'],
        default: 'pending'
    }
}, { timestamps: true });

// const User = mongoose.model('User', userSchema);
const CompletedTask = mongoose.model('CompletedTask', completedTaskSchema);
const Task = mongoose.model('Task', taskSchema);
// const AssignedTask = mongoose.model('AssignedTask', assignedTaskSchema);
module.exports = { Task, CompletedTask };