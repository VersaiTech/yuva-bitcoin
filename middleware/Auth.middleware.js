require('dotenv').config()
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('No token provided');
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
     
      req.user = decoded.userId;
    
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
  module.exports = {
    verifyToken,
  };