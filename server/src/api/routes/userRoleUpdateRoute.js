const express = require('express');
const router = express.Router();
const { isAdmin, isStaff } = require('../../api/middlewares/authMiddleware');
const userTypeBranchController = require('../controllers/userTypeBranchController');

// User role and branch update route for Admins
router.put('/updateUserRoleAndBranch', isAdmin, userTypeBranchController.updateUserRoleAndBranch);

