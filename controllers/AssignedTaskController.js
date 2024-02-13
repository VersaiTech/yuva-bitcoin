
const { AssignedTask } = require('../models/Task');
const doublechecktask = require('../helper/checkintask');
const { User } = require('../models/Task');

// Example controller to create an assigned task
const assignTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    const user = await User.findOne({ _id: userId });
  
    const assignedTask = await AssignedTask.create({ user: userId, task: taskId, twitterId: user.twitterId });
    return res.json(assignedTask);
  } catch (error) {
    console.error('Error assigning task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const markTaskCompleted = async (req, res) => {
    try {
      const assignedTaskId = req.params.assignedTaskId;
  
      const updatedTask = await AssignedTask.findOneAndUpdate(
        {task : assignedTaskId},
        { completed: true },
        { new: true }
      );
  
      // Check if the task was found and updated
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      doublechecktask();
      res.json(updatedTask);

      
    } catch (error) {
      console.error('Error marking task as completed:', error); // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Example controller for admin to confirm completion of a task
const confirmTaskCompletion = async (req, res) => {
  try {
    const assignedTaskId = req.params.assignedTaskId;
    const updatedTask = await AssignedTask.findOneAndUpdate(
      {task:assignedTaskId},
      { adminConfirmed: true },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error('Error confirming task completion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const doublechecktask = async () => {
//     const tasks = await AssignedTask.find({where: {adminConfirmed: false}});

// }


module.exports = { assignTask, markTaskCompleted, confirmTaskCompletion };