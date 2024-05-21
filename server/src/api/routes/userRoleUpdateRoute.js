const express = require('express');
const router = express.Router();
const { isAdmin, isStaff } = require('../../api/middlewares/authMiddleware');
const authenticateToken = require('../../api/middleware/authenticate');
const userTypeBranchController = require('../controllers/userTypeBranchController');


// Middleware to get user ID from request headers for demonstration purposes
router.use((req, res, next) => {
    // Assuming the user ID is sent in the headers for simplicity
    req.userID = req.headers['userID'];
    next();
  });

// User role and branch update route for Admins
router.put('/updateUserRoleAndBranch', isAdmin, userTypeBranchController.updateUserRoleAndBranch);
router.get('/getUserRoleAndBranch', authenticateToken, userTypeBranchController.getUserRoleAndBranch);

module.exports = router;