const jwt = require('jsonwebtoken');
const jwtConfig = require("../../config/jwt");
const db = require('../../config/databaseConnection');

// Middleware to check if user is admin
const checkUserRole = (roles) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtConfig, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    const { userType, branchID, userID} = decoded;

    if (!roles.includes(userType)) {
      return res.status(403).json({ message: 'Insufficient Privileges' });
    }


    req.user = { userType, branchID, userID };

    // Ensure the user is associated with the branch
    if (req.body.branchID && req.body.branchID !== branchID) {
      return res.status(403).json({ message: 'User not associated with this branch' });
    }

    next();

  });
};



module.exports = { isAdmin: checkUserRole('Admin'), isStaff: checkUserRole('Staff'),};
