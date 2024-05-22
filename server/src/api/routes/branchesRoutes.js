//Routing to the controller methods
const express = require('express');
const router = express.Router();
const {isAdmin, isStaff} = require('../middlewares/authMiddleware');
const branchSelectorController = require('../controllers/branchSelectorController');

router.get('/branches', branchSelectorController.getBranches);

module.exports = router;
