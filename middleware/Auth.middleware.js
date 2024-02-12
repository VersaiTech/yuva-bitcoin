// require('dotenv').config()
// const jwt = require("jsonwebtoken");

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
  
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthenticatedError('No token provided');
//     }
  
//     const token = authHeader.split(' ')[1];
  
//     if (!token) {
//       return res.status(403).send("A token is required for authentication");
//     }
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET_KEY);
     
//       req.user = decoded.userId;
    
//     } catch (err) {
//       return res.status(401).send("Invalid Token");
//     }
//     return next();
//   };
  
//   module.exports = {
//     verifyToken,
//   };


require('dotenv').config();
const jwt = require("jsonwebtoken");
const Member = require("../models/memberModel");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {   //|| !authHeader.startsWith('Bearer ')
        return res.status(401).send("No token provided");
    }

    // const token = authHeader.split(' ')[1];

    // if (!token) {
    //     return res.status(401).send("A token is required for authentication");
    // }

    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET_KEY);
        const userId = decoded.userId;

        // Fetch user from MongoDB based on userId
        const user = await Member.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Attach the user object to the request for further processing
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).send("Invalid token");
        } else {
            console.log(err)
            return res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = {
    verifyToken,
};
