const jwt = require('jsonwebtoken');
const jwtConfig = require("../../config/jwt");

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtConfig, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    if (decoded.userType !== 'Admin') {
      return res.status(403).json({ message: 'Only admin can perform this action' });
    }

    req.user = decoded; // Add the decoded token to the request object
    next();
  });
};

// Middleware to check if user is admin
const isStaff = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, jwtConfig, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
  
      if (decoded.userType !== 'Staff') {
        return res.status(403).json({ message: 'Only staff can perform this action' });
      }
  
      req.user = decoded; // Add the decoded token to the request object
      next();
    });
  };


module.exports = { isAdmin, isStaff};
