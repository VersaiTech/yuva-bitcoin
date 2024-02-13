const { Task } = require('../models/Task');

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

module.exports = { getAllTasks, addTask };