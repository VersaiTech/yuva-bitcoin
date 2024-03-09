const { Task, CompletedTask } = require('../models/Task');
const Member = require('../models/memberModel');
const Stake = require('../models/stake');


const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const azurecontainer = process.env.AZURE_CONTAINER;
const azureconnectionString = process.env.AZURE_STRING;


const getuserbalance = async (req, res) => {
  try {
    const userId = req.user.member_user_id;

    const member = await Member.findOne({ member_user_id: userId });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.status(200).json({ balance: member.coins });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

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
      coins: task.coins,
      taskName: task.taskName,
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

const getAllTasksUser = async (req, res) => {
  try {
    const userId = req.user.member_user_id;
    const tasks = await CompletedTask.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getConfirmedTasksForUser = async (req, res) => {
  try {
    const userId = req.user.member_user_id;  // Assuming userId is passed as a parameter

    // Fetch confirmed tasks for the user
    const confirmedTasks = await CompletedTask.find({
      userId,
      status: 'confirmed'
    })
    // .populate('taskId');  // Populate the 'taskId' field with the Task details

    res.status(200).json(confirmedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getPendingTasksForUser = async (req, res) => {
  try {
    const userId = req.user.member_user_id;  // Assuming userId is passed as a parameter

    // Fetch confirmed tasks for the user
    const confirmedTasks = await CompletedTask.find({
      userId,
      status: 'pending'
    })
    // .populate('taskId');  // Populate the 'taskId' field with the Task details

    res.status(200).json(confirmedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRejectedTasksForUser = async (req, res) => {
  try {
    const userId = req.user.member_user_id;  // Assuming userId is passed as a parameter

    // Fetch confirmed tasks for the user
    const confirmedTasks = await CompletedTask.find({
      userId,
      status: 'rejected'
    })
    // .populate('taskId');  // Populate the 'taskId' field with the Task details

    res.status(200).json(confirmedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getOneTask = async (req, res) => {
  try {
    const taskId = req.params; // Assuming you're passing the task ID in the request parameters
    const task = await Task.findOne(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPendingTasks = async (req, res) => {
  try {
    const pendingTasks = await CompletedTask.find({ status: 'pending' }).sort({ createdAt: -1 });

    if (pendingTasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No pending tasks available.',
        tasks: [],
      });
    }

    res.json(pendingTasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await CompletedTask.find({ status: 'confirmed' }).sort({ createdAt: -1 });

    if (completedTasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No completed tasks available.',
        tasks: [],
      });
    }

    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const addTask = async (req, res) => {
//   try {
//     // Extract task data from request body
//     const { taskName, description, coins, link } = req.body;
//     const imageFiles = req.files;

//     // Create a new task document
//     const newTask = new Task({
//       taskName,
//       taskId: generateRandomNumber(),
//       description,
//       coins,
//       // imageUrl: null,
//       link,
//       imageUrls: [],
//     });

//     if (imageFiles && Array.isArray(imageFiles) && imageFiles.length > 0) {
//       const blobServiceClient = BlobServiceClient.fromConnectionString(azureconnectionString);
//       const containerName = azurecontainer;
//       const containerClient = blobServiceClient.getContainerClient(containerName);

//       // Loop through each image file
//       for (let i = 0; i < imageFiles.length; i++) {
//         const imageFile = imageFiles[i];
//         const blobName = `${newTask.taskId}-${imageFile.originalname}`;
//         const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//         const imageData = imageFile.buffer;
//         await blockBlobClient.uploadData(imageData, imageData.length);

//         newTask.imageUrls.push(blockBlobClient.url); // Add the image URL to the array
//       }
//     }

//     // Save the task to the database
//     await newTask.save();

//     res.status(201).json(newTask); // Respond with the newly created task
//   } catch (error) {
//     console.error('Error adding task:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


const addTask = async (req, res) => {
  try {
    // Check if the user making the request is an admin
    const isAdmin = req.user.userType === 'admin';

    if (!isAdmin) {
      return res.status(403).json({ error: 'Permission Denied. Only admin can set scheduled time.' });
    }

    // Destructure variables from req.body
    const {
      taskName,
      description,
      coins,
      link,
      scheduledTime,
      completionDateTime,
      submissionOpen,
    } = req.body;

    // Convert date strings to Date objects
    const parsedScheduledTime = new Date(scheduledTime);
    const parsedCompletionDateTime = new Date(completionDateTime);

    // Check if completion time is before scheduled time
    if (parsedCompletionDateTime < parsedScheduledTime) {
      return res.status(400).json({ error: 'Completion time cannot be before scheduled time.' });
    }

    // Check if scheduled time is in the past
    if (parsedScheduledTime < new Date()) {
      return res.status(400).json({ error: 'Scheduled time cannot be in the past.' });
    }

    // Check if completion time is in the past
    if (parsedCompletionDateTime < new Date()) {
      return res.status(400).json({ error: 'Completion time cannot be in the past.' });
    }

    // Set submissionOpen based on current time compared to scheduledTime and completionDateTime
    const currentTime = new Date();
    const isSubmissionOpen = currentTime >= new Date(scheduledTime) && currentTime <= new Date(completionDateTime);


    // Define newTask here with the correct variables
    const newTask = new Task({
      taskId: generateRandomNumber(),
      taskName,
      description,
      coins,
      link,
      imageUrls: [],
      scheduledTime: parsedScheduledTime,
      completionTime: parsedCompletionDateTime,
      submissionOpen: isSubmissionOpen,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// only one task can be added in a day code is below
// const addTask = async (req, res) => {
//   try {
//     // Extract task data from request body
//     const { taskName, description, coins, link } = req.body;
//     const imageFiles = req.files;

//     // Check if a task has already been added on the current day
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for date comparison

//     const existingTask = await Task.findOne({ createdAt: { $gte: today } });

//     if (existingTask) {
//       return res.status(400).json({ error: 'You can only add one task per day.' });
//     }

//     // Create a new task document
//     const newTask = new Task({
//       taskName,
//       taskId: generateRandomNumber(),
//       description,
//       coins,
//       // imageUrl: null,
//       link,
//       imageUrls: [],
//     });

//     if (imageFiles && Array.isArray(imageFiles) && imageFiles.length > 0) {
//       // ... (your existing image upload logic)
//     }

//     // Save the task to the database
//     await newTask.save();

//     res.status(201).json(newTask); // Respond with the newly created task
//   } catch (error) {
//     console.error('Error adding task:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const editTask = async (req, res) => {
  try {
    // Extract task data from request body
    const { taskId } = req.params;
    const { scheduledTime, completionDateTime } = req.body; // Add this line to extract scheduledTime and completionDateTime

    // Convert date strings to Date objects
    const parsedScheduledTime = new Date(scheduledTime);
    const parsedCompletionDateTime = new Date(completionDateTime);

    // Check if completion time is before scheduled time
    if (parsedCompletionDateTime < parsedScheduledTime) {
      return res.status(400).json({ error: 'Completion time cannot be before scheduled time.' });
    }


    // Check if scheduled time is in the past
    if (parsedScheduledTime < new Date()) {
      return res.status(400).json({ error: 'Scheduled time cannot be in the past.' });
    }

    // Check if completion time is in the past
    if (parsedCompletionDateTime < new Date()) {
      return res.status(400).json({ error: 'Completion time cannot be in the past.' });
    }
    const imageData = [];
    // Set submissionOpen based on current time compared to scheduledTime and completionDateTime
    const currentTime = new Date();
    const isSubmissionOpen = currentTime >= new Date(scheduledTime) && currentTime <= new Date(completionDateTime);


    // Find the task by taskId
    const updatedData = { ...req.body, images: imageData, submissionOpen: isSubmissionOpen };
    const task = await Task.findOneAndUpdate(
      { taskId },
      { $set: updatedData },
      { new: true }
    );

    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
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


const deleteManyTasks = async (req, res) => {
  try {
    // Extract taskIds from request body
    const { taskIds } = req.body;

    // Check if taskIds array is provided
    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty taskIds array provided.' });
    }

    // Find and delete tasks by taskIds
    const deletedTasks = await Task.deleteMany({ taskId: { $in: taskIds } });

    if (deletedTasks.deletedCount === 0) {
      console.log('Tasks not found');
      return res.status(404).json({ error: 'Tasks not found' });
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Tasks deleted successfully' });
  } catch (error) {
    console.error('Error deleting tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// for admin
const getAllStakes = async (req, res) => {
  try {
    // Retrieve Stakes from the database
    const stakes = await Stake.find();

    // Check if there are no stakes found
    if (!stakes || stakes.length === 0) {
      return res.status(404).json({
        message: "No stakes found",
      });
    }

    // Respond with the Stakes
    return res.status(200).json({
      message: "Stakes retrieved successfully",
      data: stakes,
    });
  } catch (error) {
    console.error("Error retrieving stakes:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//for user 
const getAllStake = async (req, res) => {
  try {
    const { member_user_id } = req.user;
    const stakes = await Stake.find({ member_user_id: member_user_id });

    // Check if there are no stakes found
    if (!stakes || stakes.length === 0) {
      return res.status(404).json({
        message: "No stakes found",
      });
    }

    // Respond with the Stakes
    return res.status(200).json({
      message: "Stakes retrieved successfully",
      data: stakes,
    });
  } catch (error) {
    console.error("Error retrieving stakes:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

async function getMemberByUserId(req, res) {
  try {
    // Extract member_user_id from request parameters
    const { member_user_id } = req.params;

    // Fetch the member from the database based on member_user_id
    const member = await Member.findOne({ member_user_id: member_user_id });

    // If the member is not found, return a 404 response
    if (!member) {
      return res.status(200).json({
        status: false,
        message: `Member with user_id ${member_user_id} not found`,
        member: null,
      });
    }

    // Return the found member
    return res.status(200).json({
      status: true,
      message: `Member found with member_user_id ${member_user_id}`,
      member: member,
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function getAllMembers(req, res) {
  try {
    // Fetch all members from the database
    const members = await Member.find();

    // If there are no members found, return an empty array
    if (!members || members.length === 0) {
      return res.status(200).json({
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
    const activeMembers = await Member.find({ isActive: false });

    if (!activeMembers || activeMembers.length === 0) {
      return res.status(200).json({
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

    const { member_user_id } = req.params;
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


const deleteUser = async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (!req.user || req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin can delete a user.' });
    }

    const { member_user_id } = req.params;

    // Validate if member_user_id is provided
    if (!member_user_id) {
      return res.status(400).json({ error: 'Member user ID is required.' });
    }

    // Find the Member by member_user_id
    const member = await Member.findOne({ member_user_id });

    // Check if the Member exists
    if (!member) {
      return res.status(404).json({ error: 'Member not found.' });
    }

    // Delete the Member
    await Member.findOneAndDelete({ member_user_id });

    return res.status(200).json({ message: 'User deleted successfully.' });
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

module.exports = { getuserbalance, getAllStakes, getAllStake, getAllTasks, addTask, getOneTask, getMemberByUserId, editTask, deleteTask,deleteManyTasks, completeTask, confirmTaskCompletion, getAllMembers, getActiveMembers, getBlockedMembers, updateMemberStatus, deleteUser, getPendingTasks, getCompletedTasks, getConfirmedTasksForUser, getPendingTasksForUser, getRejectedTasksForUser, getAllTasksUser };
