const { Task, CompletedTask } = require('../models/Task');
const Member = require('../models/memberModel');



const completeTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const userId = req.user._id; // Assuming you have the authenticated user stored in req.user

    // Check if the user has already completed this task
    const existingCompletedTask = await CompletedTask.findOne({ userId, taskId });
    if (existingCompletedTask) {
      return res.status(400).json({ message: 'Task already completed by this user' });
    }

    // Fetch user details
    const member = await Member.findById(userId);

    if (!member) {
      return res.status(404).json({ message: 'member not found' });
    }

    // Fetch task details
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Create a new completed task record
    const completedTask = new CompletedTask({
      userId,
      taskId,
      name: member.member_name,
     description: task.description,
     status: 'pending'
    });
    await completedTask.save();

    // Reward the user (Update user's coins balance, etc.)
    // Your reward logic goes here...

    res.status(200).json({ message: 'Task in review admin will review and confirm completion' });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const confirmTaskCompletion = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    const completedTask = await CompletedTask.findOne({ userId, taskId, status: 'pending' });
    if (!completedTask) {
      return res.status(404).json({ message: 'Pending task completion not found' });
    }

    // Add admin authorization logic here if needed

    completedTask.status = 'confirmed';
    await completedTask.save();

    // Reward the user (Update user's coins balance, etc.)
    // Your reward logic goes here...

    res.status(200).json({ message: 'Task completion confirmed' });
  } catch (error) {
    console.error('Error confirming task completion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Example controller to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addTask = async (req, res) => {
    try {
        // Extract task data from request body
        const { description, coinReward } = req.body;
    
        // Create a new task document
        const newTask = new Task({
          description,
          coinReward,
        });
    
        // Save the task to the database
        await newTask.save();
    
        res.status(201).json(newTask); // Respond with the newly created task
      } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

module.exports = { getAllTasks, addTask, completeTask, confirmTaskCompletion };