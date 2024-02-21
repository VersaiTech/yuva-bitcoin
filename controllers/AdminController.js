const { Task, CompletedTask } = require('../models/Task');
const Member = require('../models/memberModel');
const Deposit = require('../models/deposit');


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
    const member = await Member.findOne({ member_user_id: userId });

    if (!member) {
      return res.status(404).json({ message: 'member not found' });
    }

    // Fetch task details
    const task = await Task.findOne({ taskId });
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
    const task = await Task.findOne({ taskId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Reward the user
    const user = await Member.findOne({ member_user_id: userId });
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


const editTask = async (req, res) => {
  try {
    // Extract task data from request body
    const { taskId } = req.body;
    const imageFiles = req.files;
    const imageData = [];

    // Find the task by taskId
    const updatedData = { ...req.body, images: imageData };
    const task = await Task.findOneAndUpdate(
      { taskId },
      { $set: updatedData },
      { new: true }
    );

    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }

    if (imageFiles && Array.isArray(imageFiles) && imageFiles.length > 0) {
      const blobServiceClient = BlobServiceClient.fromConnectionString(azureconnectionString);
      const containerName = azurecontainer;
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Clear existing imageUrls
      task.imageUrls = [];

      // Loop through each image file
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const blobName = `${task.taskId}-${imageFile.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const imageData = imageFile.buffer;
        await blockBlobClient.uploadData(imageData, imageData.length);

        task.imageUrls.push(blockBlobClient.url); // Add the image URL to the array
      }
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteTask = async (req, res) => {
  try {
    // Extract taskId from request parameters
    const { taskId } = req.params;

    // Find the task by taskId and delete it
    const task = await Task.findOneAndDelete({ taskId });

    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllDeposits = async (req, res) => {
  try {
    // Retrieve deposits from the database
    const deposits = await Deposit.find();

    // Check if there are no deposits found
    if (!deposits || deposits.length === 0) {
      return res.status(404).json({
        message: "No deposits found",
      });
    }

    // Respond with the deposits
    return res.status(200).json({
      message: "Deposits retrieved successfully",
      data: deposits,
    });
  } catch (error) {
    console.error("Error retrieving deposits:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message, 
    });
  }
};






async function getAllMembers(req, res) {
  try {
    // Fetch all members from the database
    const members = await Member.find();

    // If there are no members found, return an empty array
    if (!members || members.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No members found",
        members: [],
      });
    }

    // Return the list of members
    return res.status(200).json({
      status: true,
      message: "Members found",
      members: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function getActiveMembers(req, res) {
  try {
    // Fetch active members from the database
    const activeMembers = await Member.find({ isActive: true });

    // If there are no active members found, return an empty array
    if (!activeMembers || activeMembers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No active members found",
        members: [],
      });
    }

    // Return the list of active members
    return res.status(200).json({
      status: true,
      message: "Active members found",
      members: activeMembers,
    });
  } catch (error) {
    console.error("Error fetching active members:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function getBlockedMembers(req, res) {
  try {
    // Fetch active members from the database
    const activeMembers = await Member.find({ isActive: false });

    // If there are no active members found, return an empty array
    if (!activeMembers || activeMembers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Blocked members found",
        members: [],
      });
    }

    // Return the list of active members
    return res.status(200).json({
      status: true,
      message: "Blocked members found",
      members: activeMembers,
    });
  } catch (error) {
    console.error("Error fetching active members:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


const updateMemberStatus = async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (!req.user || req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin can update member status.' });
    }

    const {member_user_id} = req.params;
    const { isActive } = req.body;

    // Validate if member_user_id is provided
    if (!member_user_id) {
      return res.status(400).json({ error: 'Member user ID is required.' });
    }

    // Validate if isActive is provided
    if (isActive === undefined || isActive === null) {
      return res.status(400).json({ error: 'isActive field is required.' });
    }

    // Find the member by member_user_id
    const member = await Member.findOne({ member_user_id });

    // Check if the member exists
    if (!member) {
      return res.status(404).json({ error: 'Member not found.' });
    }

    // Update isActive field
    member.isActive = isActive;

    // Save the updated member
    await member.save();

    return res.status(200).json({ message: 'Member status updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};








function generateRandomNumber() {
  const min = 1000000; // Minimum 7-digit number (inclusive)
  const max = 9999999; // Maximum 7-digit number (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}



module.exports = { getAllDeposits, getAllTasks, addTask, editTask,deleteTask, completeTask, confirmTaskCompletion, getAllMembers, getActiveMembers, getBlockedMembers,updateMemberStatus };