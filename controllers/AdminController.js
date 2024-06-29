const { Task, CompletedTask } = require('../models/Task');
const Member = require('../models/memberModel');
const Stake = require('../models/stake');
const Joi = require('joi');
const Withdraw = require('../models/withdrawModel');
const Deposit = require('../models/deposit');
const ReferralHistory = require('../models/referralModel');
const AdminControl = require('../models/AdminControl.Model');
const Permission = require('../models/permission.model');
const Admin = require('../models/AdminModel');


const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { log } = require('util');

const azurecontainer = process.env.AZURE_CONTAINER;
const azureconnectionString = process.env.AZURE_STRING;


const getuserbalance = async (req, res) => {
  try {
    const userId = req.user.member_user_id;

    const member = await Member.findOne({ member_user_id: userId });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.status(200).json({
      balance: member.coins, usdt: member.deposit_usdt
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const completeTask = async (req, res) => {
  const completeTaskSchema = Joi.object({
    taskId: Joi.string().required(),
  });
  try {
    // Validate request body
    const { error, value } = completeTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { taskId } = value;
    const userId = req.user.member_user_id; // Assuming you have the authenticated user stored in req.user

    // Fetch user details
    const member = await Member.findOne({ member_user_id: userId });

    if (!member) {
      console.log('Member not found for userId:', userId);
      return res.status(404).json({ message: 'Member not found' });
    }

    // Fetch task details
    const task = await Task.findOne({ taskId });
    if (!task) {
      console.log('Task not found for taskId:', taskId);
      return res.status(404).json({ message: 'Task not found' });
    }

    // Retrieve scheduledTime and completionTime from the task object
    const { scheduledTime, completionTime } = task;

    const options = { timeZone: 'Asia/Kolkata' };

    // Convert date strings to Date objects
    const currentTime = new Date();
    const parsedScheduledTime = new Date(scheduledTime);
    const parsedCompletionDateTime = new Date(completionTime);

    // Adjust date objects to the specified time zone and assign the formatted strings
    const formattedCurrentTime = currentTime.toLocaleString('en-US', options);
    const formattedScheduledTime = parsedScheduledTime.toLocaleString('en-US', options);
    const formattedCompletionDateTime = parsedCompletionDateTime.toLocaleString('en-US', options);

    console.log("Time of completed task :", formattedCurrentTime, formattedScheduledTime, formattedCompletionDateTime);

    if (currentTime < parsedScheduledTime || currentTime > parsedCompletionDateTime) {
      console.log('Task submission is not allowed at this time.');
      return res.status(400).json({ message: 'Task submission is not allowed at this time.' });
    }

    // Check if the user has already completed this task
    const existingCompletedTask = await CompletedTask.findOne({ userId, taskId, taskId });
    if (existingCompletedTask) {
      console.log('Task already completed by this user.');
      return res.status(400).json({ message: 'Task already Submitted by this user; Admin will review and reward to your task' });
    }

    console.log(member.twitterId);
    // Create a new completed task record
    const completedTask = new CompletedTask({
      userId,
      taskId,
      coins: task.coins,
      taskName: task.taskName,
      name: member.member_name,
      description: task.description,
      link: task.link,
      twitterId: member.twitterId,
      status: 'pending'
    });
    console.log(completeTask.twitterId)
    await completedTask.save();

    // Reward the user (Update user's coins balance, etc.)
    // Your reward logic goes here...

    console.log('Task submitted successfully.');
    res.status(200).json({ message: 'Task in review; admin will review and confirm completion' });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// working but on click it is  confirmed 
// const confirmTaskCompletion = async (req, res) => {
//   const confirmTaskCompletionSchema = Joi.object({
//     taskId: Joi.string().required(),
//     userId: Joi.string().required(),
//   });
//   try {
//     // Validate request body
//     const { error, value } = confirmTaskCompletionSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
//     const { taskId, userId } = value;

//     const completedTask = await CompletedTask.findOne({ userId: userId, taskId: taskId, status: 'pending' });

//     console.log(completedTask);
//     if (!completedTask) {
//       return res.status(404).json({ message: 'Pending task completion not found' });
//     }

//     // Fetch task details to get the reward amount
//     const task = await Task.findOne({ taskId });
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Reward the user
//     const user = await Member.findOne({ member_user_id: userId });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     completedTask.status = 'confirmed';
//     await completedTask.save();

//     // Update user's coins balance with the reward from the task
//     user.coins += task.coins; // Assuming task.reward contains the reward amount
//     await user.save();

//     res.status(200).json({ message: 'Task completion confirmed. User rewarded.' });
//   } catch (error) {
//     console.error('Error confirming task completion:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const confirmTaskCompletion = async (req, res) => {
  const confirmTaskCompletionSchema = Joi.object({
    taskId: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string().valid('confirmed', 'rejected').required(),
    reason: Joi.string().required(),
  });

  try {
    // Validate request body
    const { error, value } = confirmTaskCompletionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }


    const user = req.user.admin_user_id;
    const adminCheck = await Admin.findOne({ admin_user_id: user });

    if (!adminCheck) {
      return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Task approval.' });
    }

    if (adminCheck.userType === 'agent') {
      if (adminCheck.isActive === false) {
        return res.status(403).json({ error: 'Permission denied. Your account is deactivated.' });
      }
      const permission = await Permission.findOne({ admin_user_id: user })
      if (permission.setTaskApprove === false) {
        return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Task approval.' });
      }
    }


    const { taskId, userId, status, reason } = value;

    const completedTask = await CompletedTask.findOne({ userId: userId, taskId: taskId });
    if (!completedTask) {
      return res.status(404).json({ message: 'Pending task completion not found' });
    }

    // Check if the status is already confirmed or rejected
    if (completedTask.status === 'confirmed' || completedTask.status === 'rejected') {
      return res.status(400).json({ message: `Task completion is already ${completedTask.status}` });
    }

    // Update status
    completedTask.status = status;
    await completedTask.save();

    if (status === 'confirmed') {
      // Fetch task details to get the reward amount
      const task = await Task.findOne({ taskId });
      if (!task) {
        q
        return res.status(404).json({ message: 'Task not found' });
      }

      // Reward the user
      const user = await Member.findOne({ member_user_id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user's coins balance with the reward from the task
      user.coins += task.coins; // Assuming task.reward contains the reward amount
      await user.save();

      return res.status(200).json({ message: 'Task completion confirmed. User rewarded.' });
    } else if (status === 'rejected') {
      completedTask.reason = reason; // Save the reason for rejection
      await completedTask.save();
      return res.status(200).json({ message: 'Task completion rejected. User not rewarded.' });
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }
  } catch (error) {
    console.error('Error confirming task completion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const confirmMultipleTaskCompletions = async (req, res) => {
  const confirmTaskCompletionSchema = Joi.object({
    taskId: Joi.string().required(),
    userIds: Joi.array().items(Joi.string().required()).required(), // Accept an array of userIds
    status: Joi.string().valid('confirmed', 'rejected').required(),
    reason: Joi.string().required(),
  });

  try {
    // Validate request body
    const { error, value } = confirmTaskCompletionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = req.user.admin_user_id;
    const adminCheck = await Admin.findOne({ admin_user_id: user });

    if (!adminCheck) {
      return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Approve Multiple Task.' });
    }

    if (adminCheck.userType === 'agent') {
      if (adminCheck.isActive === false) {
        return res.status(403).json({ error: 'Permission denied. Your account is deactivated.' });
      }
      const permission = await Permission.findOne({ admin_user_id: user })
      if (permission.setAllTaskApprove === false) {
        return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Approve Multiple Task.' });
      }
    }

    const { taskId, userIds, status, reason } = value;

    // Loop through each userId and confirm task completion
    for (const userId of userIds) {
      const completedTask = await CompletedTask.findOne({ userId, taskId });
      if (!completedTask) {
        return res.status(404).json({ message: `Pending task completion not found for userId: ${userId}` });
      }

      // Check if the status is already confirmed or rejected
      if (completedTask.status === 'confirmed' || completedTask.status === 'rejected') {
        return res.status(400).json({ message: `Task completion is already ${completedTask.status} for userId: ${userId}` });
      }

      // Update status
      completedTask.status = status;
      await completedTask.save();

      if (status === 'confirmed') {
        // Fetch task details to get the reward amount
        const task = await Task.findOne({ taskId });
        if (!task) {
          // Skip to the next user and continue the loop
          continue;
        }

        // Reward the user
        const user = await Member.findOneAndUpdate(
          { member_user_id: userId },
          { $inc: { coins: task.coins } },
          { new: true }
        );
        if (!user) {
          // Skip to the next user and continue the loop
          continue;
        }

      } else if (status === 'rejected') {
        completedTask.reason = reason; // Save the reason for rejection
        await completedTask.save();
      } else {
        return res.status(400).json({ message: 'Invalid status' });
      }
    }

    return res.status(200).json({ message: `Task completion ${status} for all users.` });
  } catch (error) {
    console.error('Error confirming task completions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getAllTasksUser = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const userId = req.user.member_user_id;
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const totalUserTasks = await CompletedTask.countDocuments({ userId });
    // Fetch tasks for the user with sorting and pagination
    const tasks = await CompletedTask.find({ userId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalUserTasks,
        tasks: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalUserTasks,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllTasks = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    // Set default values if not provided
    const page_number = value.page_number || 1;
    const count = value.count || 10; // You can adjust the default count as needed
    const offset = (page_number - 1) * count;
    const currentTime = new Date(); // Define currentTime here
    const allTasks = await Task.find();
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found",
        allTasks: allTasks.length,
        tasks: [],
      });
    }


    // const allUsersTask = await CompletedTask.find({ userId: req.user.member_user_id, status: 'completed' });
    // const completedTaskIds = allUsersTask.map(task => task.taskId);
    // console.log(completedTaskIds);
    // const updatedTasks = [];

    // tasks.forEach(task => {
    //   const status = completedTaskIds.includes(task.taskId) ? 'completed' : 'pending';
    //   updatedTasks.push({ ...task.toObject(), status });
    // });

    const allUsersTask = await CompletedTask.find({ userId: req.user.member_user_id });
    const completedTaskStatus = allUsersTask.reduce((acc, task) => {
      acc[task.taskId] = task.status;
      return acc;
    }, {});

    const updatedTasks = tasks.map(task => {
      let status = completedTaskStatus[task.taskId] || 'OPEN';


      // Check if the task's scheduled time is in the past
      if (task.scheduledTime <= currentTime) {
        // Check if the task's completion time is in the past
        if (task.completionTime <= currentTime) {
          status = 'EXPIRED'; // Set status to CLOSE if completion time has passed
        }
      }
      return { ...task.toObject(), status };
    });


    return res.status(200).json({
      status: true,
      message: "Tasks found",
      allTasks: allTasks.length,
      tasks: updatedTasks,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// below code is for admin 
const getAllTasksforAdminWithoutStatus = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }


  try {
    // Set default values if not provided
    const page_number = value.page_number || 1;
    const count = value.count || 10; // You can adjust the default count as needed
    const offset = (page_number - 1) * count;
    const allTasks = await Task.find();
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found",
        allTasks: allTasks.length,
        tasks: [],
      });
    }


    // const allUsersTask = await CompletedTask.find({ userId: req.user.member_user_id, status: 'completed' });
    // const completedTaskIds = allUsersTask.map(task => task.taskId);
    // console.log(completedTaskIds);
    // const updatedTasks = [];

    // tasks.forEach(task => {
    //   const status = completedTaskIds.includes(task.taskId) ? 'completed' : 'pending';
    //   updatedTasks.push({ ...task.toObject(), status });
    // });


    // const tasks = await Task.find();
    return res.status(200).json({
      status: true,
      message: "Tasks found",
      allTasks: allTasks.length,
      tasks: tasks,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getConfirmedTasksForUser = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const userId = req.user.member_user_id;
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    // Fetch tasks for the user with sorting and pagination
    const tasks = await CompletedTask.find({ userId, status: 'confirmed' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const totalCompletedTasks = await CompletedTask.countDocuments({ userId, status: 'confirmed' });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalCompletedTasks,
        tasks: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalCompletedTasks,
      tasks: tasks,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getPendingTasksForUser = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const userId = req.user.member_user_id;
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    // Fetch tasks for the user with sorting and pagination
    const tasks = await CompletedTask.find({ userId, status: 'pending' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    const totalPenidngTasks = await CompletedTask.countDocuments({ userId, status: 'pending' });
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalPenidngTasks,
        tasks: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalPenidngTasks,
      tasks: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRejectedTasksForUser = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const userId = req.user.member_user_id;
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    // Fetch tasks for the user with sorting and pagination
    const tasks = await CompletedTask.find({ userId, status: 'rejected' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    const totalRejectedTasks = await CompletedTask.countDocuments({ userId, status: 'rejected' });
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalRejectedTasks,
        tasks: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalRejectedTasks,
      tasks: tasks,
    });
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

const getOneTaskforAdminConfirmationTask = async (req, res) => {
  try {
    const { taskId, userId } = req.params;

    const task = await CompletedTask.findOne({ taskId, userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const getPendingTasks = async (req, res) => {
//   const Schema = Joi.object({
//     page_number: Joi.number(),
//     count: Joi.number(),
//   });

//   const { error, value } = Schema.validate(req.params);

//   if (error) {
//     return res.status(400).json({ status: false, error: error.details[0].message });
//   }
//   try {
//     const page_number = value.page_number || 1;
//     const count = value.count || 10;
//     const offset = (page_number - 1) * count;


//     const tasks = await CompletedTask.find({ status: 'pending' })
//       .sort({ createdAt: -1 })
//       .skip(offset)
//       .limit(count);

//     console.log("tasks", tasks)
//     const userIds = tasks.map(task => task.userId);
//     console.log("userIds", userIds)


//     const users = await Member.find({ member_user_id: { $in: userIds } });
//     console.log("users", users)

//     const twitterIds = users.map(user => user.twitterId );
//     console.log("twitterIds", twitterIds)


//     const totalPendingTasks = await CompletedTask.countDocuments({ status: 'pending' });

//     if (!tasks || tasks.length === 0) {
//       return res.status(200).json({
//         status: false,
//         message: "No tasks found for the user",
//         totalPendingTasks: totalPendingTasks,
//         twitterIds: twitterIds,
//         tasks: [],
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Tasks found for the user",
//       totalPendingTasks: totalPendingTasks,
//       twitterIds: twitterIds,
//       tasks: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const getPendingTasks = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const tasks = await CompletedTask.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const userIds = tasks.map(task => task.userId);

    const users = await Member.find({ member_user_id: { $in: userIds } });
    const twitterIdMap = new Map(users.map(user => [user.member_user_id, user.twitterId]));

    const totalPendingTasks = await CompletedTask.countDocuments({ status: 'pending' });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalPendingTasks: totalPendingTasks,
        tasks: [],
      });
    }

    const tasksWithTwitterIds = tasks.map(task => {
      const twitterId = twitterIdMap.get(task.userId);
      return {
        ...task.toObject(),
        twitterId: twitterId || null
      };
    });

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalPendingTasks: totalPendingTasks,
      tasks: tasksWithTwitterIds,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const getCompletedTasks = async (req, res) => {
//   const Schema = Joi.object({
//     page_number: Joi.number(),
//     count: Joi.number(),
//   });

//   const { error, value } = Schema.validate(req.params);

//   if (error) {
//     return res.status(400).json({ status: false, error: error.details[0].message });
//   }
//   try {
//     const page_number = value.page_number || 1;
//     const count = value.count || 10;
//     const offset = (page_number - 1) * count;

//     const tasks = await CompletedTask.find({ status: 'confirmed' })
//       .sort({ createdAt: -1 })
//       .skip(offset)
//       .limit(count);


//     console.log("tasks", tasks)
//     const userIds = tasks.map(task => task.userId);
//     console.log("userIds", userIds)


//     const users = await Member.find({ member_user_id: { $in: userIds } });
//     console.log("users", users)

//     const twitterIds = users.map(user => user.twitterId);
//     console.log("twitterIds", twitterIds)

//     const totalCompletedTasks = await CompletedTask.countDocuments({ status: 'confirmed' });

//     if (!tasks || tasks.length === 0) {
//       return res.status(200).json({
//         status: false,
//         message: "No tasks found for the user",
//         totalCompletedTasks: totalCompletedTasks,
//         twitterIds: twitterIds,
//         tasks: [],
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Tasks found for the user",
//       totalCompletedTasks: totalCompletedTasks,
//       twitterIds: twitterIds,
//       tasks: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getCompletedTasks = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const tasks = await CompletedTask.find({ status: 'confirmed' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const userIds = tasks.map(task => task.userId);

    const users = await Member.find({ member_user_id: { $in: userIds } });
    const twitterIdMap = new Map(users.map(user => [user.member_user_id, user.twitterId]));

    const totalCompletedTasks = await CompletedTask.countDocuments({ status: 'confirmed' });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalCompletedTasks: totalCompletedTasks,
        tasks: [],
      });
    }

    const tasksWithTwitterIds = tasks.map(task => {
      const twitterId = twitterIdMap.get(task.userId);
      return {
        ...task.toObject(),
        twitterId: twitterId || null
      };
    });

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalCompletedTasks: totalCompletedTasks,
      tasks: tasksWithTwitterIds,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const getRejectedTasks = async (req, res) => {
//   const Schema = Joi.object({
//     page_number: Joi.number(),
//     count: Joi.number(),
//   });

//   const { error, value } = Schema.validate(req.params);

//   if (error) {
//     return res.status(400).json({ status: false, error: error.details[0].message });
//   }
//   try {
//     const page_number = value.page_number || 1;
//     const count = value.count || 10;
//     const offset = (page_number - 1) * count;

//     // Fetch tasks for the user with sorting and pagination
//     const tasks = await CompletedTask.find({ status: 'rejected' })
//       .sort({ createdAt: -1 })
//       .skip(offset)
//       .limit(count);
//     const totalRejectedTasks = await CompletedTask.countDocuments({ status: 'rejected' });

//     if (!tasks || tasks.length === 0) {
//       return res.status(200).json({
//         status: false,
//         message: "No tasks found for the user",
//         totalRejectedTasks: totalRejectedTasks,
//         tasks: [],
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Tasks found for the user",
//       totalRejectedTasks: totalRejectedTasks,
//       tasks: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getRejectedTasks = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const tasks = await CompletedTask.find({ status: 'rejected' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const userIds = tasks.map(task => task.userId);

    const users = await Member.find({ member_user_id: { $in: userIds } });
    const twitterIdMap = new Map(users.map(user => [user.member_user_id, user.twitterId]));

    const totalRejectedTasks = await CompletedTask.countDocuments({ status: 'rejected' });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No tasks found for the user",
        totalRejectedTasks: totalRejectedTasks,
        tasks: [],
      });
    }

    const tasksWithTwitterIds = tasks.map(task => {
      const twitterId = twitterIdMap.get(task.userId);
      return {
        ...task.toObject(),
        twitterId: twitterId || null
      };
    });

    return res.status(200).json({
      status: true,
      message: "Tasks found for the user",
      totalRejectedTasks: totalRejectedTasks,
      tasks: tasksWithTwitterIds,
    });
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
  const addTaskSchema = Joi.object({
    taskName: Joi.string().required(),
    description: Joi.string().required(),
    coins: Joi.number().required(),
    link: Joi.string().uri().required(),
    scheduledTime: Joi.date().iso().required(),
    completionTime: Joi.date().iso().required(),
  });
  try {

    const user = req.user.admin_user_id;
    const adminCheck = await Admin.findOne({ admin_user_id: user });

    if (!adminCheck) {
      return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Create Task.' });
    }

    if (adminCheck.userType === 'agent') {
      if (adminCheck.isActive === false) {
        return res.status(403).json({ error: 'Permission denied. Your account is deactivated.' });
      }
      const permission = await Permission.findOne({ admin_user_id: user })
      if (permission.setTaskCreate === false) {
        return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Create Task.' });
      }
    }

    // Validate request body
    const { error, value } = addTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Destructure variables from req.body
    const {
      taskName,
      description,
      coins,
      link,
      scheduledTime,
      completionTime,
    } = value;

    const options = { timeZone: 'Asia/Kolkata' }; // 'Asia/Kolkata' is the time zone for Indian Standard Time

    // Convert date strings to Date objects
    const parsedScheduledTime = new Date(scheduledTime);
    const parsedCompletionDateTime = new Date(completionTime);

    // Adjust date objects to the specified time zone
    parsedScheduledTime.toLocaleString('en-US', options);
    parsedCompletionDateTime.toLocaleString('en-US', options);

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

    console.log(currentTime, parsedScheduledTime, parsedCompletionDateTime);

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
      // submissionOpen: isSubmissionOpen,
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
  const editTaskSchema = Joi.object({
    scheduledTime: Joi.date().iso().required(),
    completionTime: Joi.date().iso().required(),
  });
  try {
    // Extract task data from request body
    const { taskId } = req.params;
    const { scheduledTime, completionTime } = req.body; // Add this line to extract scheduledTime and completionDateTime

    const admin = req.user;
    if (admin.userType !== 'admin') {
      return res.status(403).json({ message: 'Permission Denied. Only admin can access this route.' });
    }
    const { error, value } = editTaskSchema.validate({ scheduledTime, completionTime });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Convert date strings to Date objects
    const parsedScheduledTime = new Date(value.scheduledTime);
    const parsedCompletionDateTime = new Date(value.completionTime);

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
    // const isSubmissionOpen = currentTime >= new Date(scheduledTime) && currentTime <= new Date(completionTime);


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

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  const deleteTaskSchema = Joi.object({
    taskId: Joi.string().required()
  });
  try {
    // Validate request parameters
    const { error, value } = deleteTaskSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const admin = req.user;
    if (admin.userType !== 'admin') {
      return res.status(403).json({ message: 'Permission Denied. Only admin can access this route.' });
    }
    // Extract taskId from request parameters
    const { taskId } = value;

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
  const deleteManyTasksSchema = Joi.object({
    taskIds: Joi.array().items(Joi.string().required()).min(1).required()
  });
  try {
    // Validate request body
    const { error, value } = deleteManyTasksSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const admin = req.user;
    if (admin.userType !== 'admin') {
      return res.status(403).json({ message: 'Permission Denied. Only admin can access this route.' });
    }
    // Extract taskIds from request body
    const { taskIds } = value;

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
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    // Fetch all stakes with sorting and pagination
    const stakes = await Stake.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    // If there are no stakes found, return an empty array
    if (!stakes || stakes.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No stakes found",
        stakes: [],
      });
    }

    // Return the list of stakes
    return res.status(200).json({
      status: true,
      message: "Stakes found",
      stakes: stakes,
    });
  } catch (error) {
    console.error("Error retrieving stakes:", error);
    return res.status(500).json({
      status: false,
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


async function updateMemberDetails(req, res) {
  try {
    const { contactNo, member_name, email, wallet_address, twitterId } = req.body;
    const userId = req.user.member_user_id; // Assuming user id is stored in the request object after authentication

    // Check if the user exists
    const existingMember = await Member.findOne({ member_user_id: userId });
    if (!existingMember) {
      return res.status(404).json({
        status: false,
        message: "Member not found",
      });
    }

    // Update member details
    if (contactNo) existingMember.contactNo = contactNo;
    if (member_name) existingMember.member_name = member_name;
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   existingMember.password = await bcrypt.hash(password, salt);
    // }
    if (email) existingMember.email = email;
    if (twitterId) existingMember.twitterId = twitterId;
    // if (twitterId) existingMember.twitterId = twitterId;
    if (wallet_address) existingMember.wallet_address = wallet_address;

    // Save updated member details
    await existingMember.save();

    return res.status(200).json({
      status: true,
      message: "Member details updated successfully",
    });
  } catch (error) {
    console.error("Error updating member details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


async function getMemberDetails(req, res) {
  try {
    // Extract user_id from the request object
    const userId = req.user.member_user_id; // Assuming you have user data stored in the request object

    // Fetch the member from the database based on user_id
    const member = await Member.findOne({ member_user_id: userId });

    // If the member is not found, return a 404 response
    if (!member) {
      return res.status(200).json({
        status: false,
        message: `Member details not found for the current user`,
        member: null,
      });
    }

    // Return the found member details
    return res.status(200).json({
      status: true,
      message: `Member details found for the current user`,
      member: member,
    });
  } catch (error) {
    console.error("Error fetching member details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


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

// async function getAllMembers(req, res) {
//   try {
//     // Fetch all members from the database
//     const members = await Member.find();

//     // If there are no members found, return an empty array
//     if (!members || members.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No members found",
//         members: [],
//       });
//     }

//     // Return the list of members
//     return res.status(200).json({
//       status: true,
//       message: "Members found",
//       members: members,
//     });
//   } catch (error) {
//     console.error("Error fetching members:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// }

// =============================================================================================


const getAllMembers = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    // Set default values if not provided
    const page_number = value.page_number || 1;
    const count = value.count || 10; // You can adjust the default count as needed
    const offset = (page_number - 1) * count;

    const members = await Member.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    // Count total members
    const totalMembers = await Member.countDocuments();
    if (!members || members.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No members found",
        count: totalMembers,
        members: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Members found",
      count: totalMembers,
      members: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};



async function getActiveMembers(req, res) {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10; // You can adjust the default count as needed
    const offset = (page_number - 1) * count;

    // Fetch active members with sorting and pagination
    const activeMembers = await Member.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);


    const totalActiveMembers = await Member.countDocuments({ isActive: true });


    // If there are no active members found, return an empty array
    if (!activeMembers || activeMembers.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No active members found",
        count: totalActiveMembers,
        members: [],
      });
    }

    // Return the list of active members
    return res.status(200).json({
      status: true,
      message: "Active members found",
      count: totalActiveMembers,
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
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10; // You can adjust the default count as needed
    const offset = (page_number - 1) * count;

    // Fetch active members with sorting and pagination
    const activeMembers = await Member.find({ isActive: false })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    const totalActiveMembers = await Member.countDocuments({ isActive: false });
    // If there are no active members found, return an empty array
    if (!activeMembers || activeMembers.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No Blocked members found",
        count: totalActiveMembers,
        members: [],
      });
    }

    // Return the list of active members
    return res.status(200).json({
      status: true,
      message: "Blocked members found",
      count: totalActiveMembers,
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
  const updateMemberStatusSchema = Joi.object({
    isActive: Joi.boolean().required(),
  });

  try {
    const user = req.user.admin_user_id;
    const adminCheck = await Admin.findOne({ admin_user_id: user });

    if (!adminCheck) {
      return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Block Member.' });
    }

    if (adminCheck.userType === 'agent') {
      if (adminCheck.isActive === false) {
        return res.status(403).json({ error: 'Permission denied. Your account is deactivated.' });
      }
      const permission = await Permission.findOne({ admin_user_id: user })
      if (permission.setUserBlock === false) {
        return res.status(403).json({ error: 'Permission denied. You don\'t have the permission to Block Member.' });
      }
    }

    const { member_user_id } = req.params;
    const { error, value } = updateMemberStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { isActive } = value;
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
  const deleteUserSchema = Joi.object({
    member_user_id: Joi.string().required(),
  });
  try {
    const admin = req.user;
    if (admin.userType !== 'admin') {
      return res.status(403).json({ message: 'Permission Denied. Only admin can access this route.' });
    }
    // Check if the user making the request is an admin
    if (!req.user || req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin can delete a user.' });
    }
    // Validate request parameters
    const { error, value } = deleteUserSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { member_user_id } = value;

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


async function countMembersWithCoins(req, res) {
  try {
    const membersWithCoins = await Member.aggregate([
      { $match: { coins: { $gte: 1 } } },
      {
        $group: {
          _id: null,
          totalCoins: { $sum: '$coins' },
          totalUsdt: { $sum: '$deposit_usdt' },
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      totalCoins: 0,
      totalUsdt: 0,
      count: 0
    };

    if (membersWithCoins.length > 0) {
      const { totalCoins, totalUsdt, count } = membersWithCoins[0];
      result.totalCoins = totalCoins;
      result.totalUsdt = totalUsdt
      result.count = count;
    }

    return res.status(200).json({ status: true, message: "Members with coins", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}



async function countMemberWithStakeCoins(req, res) {
  try {
    const membersWithStakeCoins = await Stake.aggregate([
      { $match: { stake_type: "Wallet" } },
      {
        $group: {
          _id: null,
          totalStakeCoins: { $sum: '$investment' },
          count: { $sum: 1 }
        }
      }]);
    const result = {
      totalStakeCoins: 0,
      count: 0
    };
    if (membersWithStakeCoins.length > 0) {
      const { totalStakeCoins, count } = membersWithStakeCoins[0];
      result.totalStakeCoins = totalStakeCoins;
      result.count = count;
    }

    return res.status(200).json({ status: true, message: "Members with stake coins", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}


async function findMember(req, res) {
  try {

    const { member_name, contactNo, email } = req.body;
    const query = {};
    if (member_name) {
      //minimum 3 character
      if (member_name.length < 3) {
        return res.status(400).json({ status: false, message: "Minimum 3 character required" });
      }
      query.member_name = { $regex: member_name, $options: "i" };
    }
    if (contactNo) {
      query.contactNo = { $regex: contactNo, $options: "i" };
    }
    if (email) {
      query.email = { $regex: email, $options: "i" };
    }
    if (Object.keys(query).length === 0) {
      return res.status(400).json({ status: false, message: "At least one field is required" });
    }
    const member = await Member.find(query);
    if (member.length == 0) {
      return res.status(404).json({ status: false, message: "Member not found" });
    }
    return res.status(200).json({ status: true, message: "Member found", data: member });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}


async function findMemberInTask(req, res) {
  try {
    const { name } = req.body
    if (name.length < 3) {
      return res.status(400).json({ status: false, message: "Minimum 3 character required" });
    }
    const member = await CompletedTask.find({ name: { $regex: name, $options: "i" } });

    if (member.length == 0) {
      return res.status(404).json({ status: false, message: "Member not found" });
    }
    return res.status(200).json({ status: true, message: "Member found", data: member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}


async function findTaskByName(req, res) {
  try {
    const userId = req.user.member_user_id
    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { taskName } = req.body;
    if (taskName.length < 3) {
      return res.status(400).json({ status: false, message: "Minimum 3 character required" });
    }
    // const task = await Task.find({ taskName: { $regex: taskName, $options: "i" } });
    const task = await Task.find({ taskName: { $regex: taskName, $options: "i" } }).lean();
    if (task.length == 0) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    return res.status(200).json({ status: true, message: "Task found", data: task });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}


async function findTasbyNameAdmin(req, res) {
  try {
    const user = req.user.admin_user_id;
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const { taskName } = req.body;
    if (taskName.length < 3) {
      return res.status(400).json({ status: false, message: "Minimum 3 character required" });
    }

    const task = await Task.find({ taskName: { $regex: taskName, $options: "i" } }).lean();
    if (task.length == 0) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    return res.status(200).json({ status: true, message: "Task found", data: task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}




const userRegToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const users = await Member.find({
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!users || users.length === 0) {
      return res.status(200).json({ status: false, message: "No users found", counts: 0, data: [] });
    }

    const totalUsers = await users.length

    return res.status(200).json({ status: true, message: "Users registered today", counts: totalUsers, data: users });
    // return { status: true, message: "Users registered today", counts: totalUsers, data: users };
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

const stakeToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const stake = await Stake.find({
      sys_date: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const totalStake = await stake.length
    if (!stake || stake.length === 0) {
      return res.status(200).json({ status: false, message: "No stake found", counts: 0, data: [] });
    }
    return res.status(200).json({ status: true, message: "Stake today", counts: totalStake, data: stake });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

const withdrawSToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const withdraw = await Withdraw.find({
      status: 'Approved',
      processing_date: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    if (!withdraw || withdraw.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }

    const totalwithdrawS = await withdraw.length
    return res.status(200).json({ status: true, message: "Withdraw Approved today", counts: totalwithdrawS, data: withdraw });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

const withdrawRToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const withdraw = await Withdraw.find({
      status: 'Rejected',
      processing_date: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    if (!withdraw || withdraw.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }
    const totalwithdrawR = await withdraw.length
    return res.status(200).json({ status: true, message: "Withdraw Rejected today", counts: totalwithdrawR, data: withdraw });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

const withdrawPToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    console.log("today", today, "startOfToday", startOfToday, "endOfToday", endOfToday);
    const withdraw = await Withdraw.find({
      status: 'Pending',
      with_date: {
        $gte: startOfToday,
        $lt: new Date(endOfToday.getTime() - 1) // subtract 1 millisecond to ensure the end date is exclusive
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!withdraw || withdraw.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }
    const totalwithdrawP = await withdraw.length
    return res.status(200).json({ status: true, message: "Withdraw Pending today", counts: totalwithdrawP, data: withdraw });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });

  }
}
const usdtDepositToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const deposit = await Deposit.find({
      deposit_type: 'usdt',
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    if (!deposit || deposit.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }
    const totalDeposit = await deposit.length
    return res.status(200).json({ status: true, message: "Withdraw Pending today", counts: totalDeposit, data: deposit });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });

  }
}
const referralToday = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const referral = await ReferralHistory.find({
      referral_user_isRefered: true,
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    if (!referral || referral.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }
    const totalReferral = await referral.length
    return res.status(200).json({ status: true, message: "Withdraw Pending today", counts: totalReferral, data: referral });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });

  }
}

const smallData = async (req, res) => {
  const schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const adminControl = await AdminControl.find({}, {}, { sort: { updatedAt: -1 } }).limit(1);
    if (!adminControl || adminControl.length === 0) {
      return res.status(200).json({ status: false, message: "No withdraw found", counts: 0, data: [] });
    }

    return res.status(200).json({ status: true, message: "Small data", data: adminControl[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

module.exports = { getuserbalance, getAllStakes, getAllStake, getAllTasks, smallData, addTask, getOneTask, findTasbyNameAdmin, getMemberByUserId, editTask, deleteTask, deleteManyTasks, completeTask, confirmTaskCompletion, getAllMembers, getRejectedTasks, getActiveMembers, getBlockedMembers, updateMemberStatus, deleteUser, getPendingTasks, getCompletedTasks, getConfirmedTasksForUser, getPendingTasksForUser, getOneTaskforAdminConfirmationTask, getRejectedTasksForUser, getAllTasksUser, getMemberDetails, updateMemberDetails, getAllTasksforAdminWithoutStatus, countMembersWithCoins, countMemberWithStakeCoins, findMember, findMemberInTask, userRegToday, stakeToday, withdrawSToday, withdrawRToday, withdrawPToday, usdtDepositToday, referralToday, findTaskByName, confirmMultipleTaskCompletions }; 