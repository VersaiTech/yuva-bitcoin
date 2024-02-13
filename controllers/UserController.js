const { User } = require('../models/Task'); // Assuming your models are in a 'models' directory

// Example controller to get user information by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log(userId);

    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, password, email,twitterId, coins } = req.body;
    
        // Create a new user document
        const newUser = new User({
          username,
          password,
          email,
          twitterId,
          coins,
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json(newUser); // Respond with the newly created user
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }


module.exports = { getUserById, addUser };