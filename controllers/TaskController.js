const { Task, CompletedTask } = require('../models/Task');
const Member = require('../models/memberModel');


const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const azurecontainer = process.env.AZURE_CONTAINER;
const azureconnectionString = process.env.AZURE_STRING;




const completeTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const userId = req.user.member_user_id; // Assuming you have the authenticated user stored in req.user

    // Check if the user has already completed this task
    const existingCompletedTask = await CompletedTask.findOne({ userId, taskId });
    if (existingCompletedTask) {
      return res.status(400).json({ message: 'Task already completed by this user' });
    }

    // Fetch user details
    const member = await Member.findOne({member_user_id: userId});

    if (!member) {
      return res.status(404).json({ message: 'member not found' });
    }

    // Fetch task details
    const task = await Task.findOne({taskId});
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Create a new completed task record
    const completedTask = new CompletedTask({
      userId,
      taskId,
      name: member.member_name,
     description: task.description,
     link: task.link,
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

    const completedTask = await CompletedTask.findOne({ userId: userId, taskId: taskId, status: 'pending' });

    console.log(completedTask);
    if (!completedTask) {
      return res.status(404).json({ message: 'Pending task completion not found' });
    }

    // Fetch task details to get the reward amount
    const task = await Task.findOne({taskId});
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Reward the user
    const user = await Member.findOne({member_user_id: userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    completedTask.status = 'confirmed';
    await completedTask.save();

    // Update user's coins balance with the reward from the task
    user.coins += task.coins; // Assuming task.reward contains the reward amount
    await user.save();

    res.status(200).json({ message: 'Task completion confirmed. User rewarded.' });
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
        const { description, coins, link } = req.body;
        const imageFiles = req.files;
    
        // Create a new task document
        const newTask = new Task({
          taskId: generateRandomNumber(),
          description,
          coins,
          // imageUrl: null,
          link,
          imageUrls: [],
        });

        if (imageFiles && Array.isArray(imageFiles) && imageFiles.length > 0) {
          const blobServiceClient = BlobServiceClient.fromConnectionString(azureconnectionString);
          const containerName = azurecontainer;
          const containerClient = blobServiceClient.getContainerClient(containerName);

          // Loop through each image file
          for (let i = 0; i < imageFiles.length; i++) {
              const imageFile = imageFiles[i];
              const blobName = `${newTask.taskId}-${imageFile.originalname}`;
              const blockBlobClient = containerClient.getBlockBlobClient(blobName);

              const imageData = imageFile.buffer;
              await blockBlobClient.uploadData(imageData, imageData.length);

              newTask.imageUrls.push(blockBlobClient.url); // Add the image URL to the array
          }
      }
    
        // Save the task to the database
        await newTask.save();
    
        res.status(201).json(newTask); // Respond with the newly created task
      } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }


    function generateRandomNumber() {
      const min = 1000000; // Minimum 7-digit number (inclusive)
      const max = 9999999; // Maximum 7-digit number (inclusive)
    
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

module.exports = { getAllTasks, addTask, completeTask, confirmTaskCompletion };