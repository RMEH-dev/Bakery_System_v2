const express = require('express');
const router = express.Router();
const AdminAnalyticsController = require('../controllers/adminAnalyticsController');


router.get('/analytics/categories', AdminAnalyticsController.getCategories);
router.get('/analytics/category/:category', AdminAnalyticsController.getCategoryData);
router.get('/analytics/revenue/:category',AdminAnalyticsController.getCategoryRevenueData)
router.get('/analytics/branches', AdminAnalyticsController.getBranches);
router.get('/analytics/branch/:branchID', AdminAnalyticsController.getBranchProductQuantities);
router.get('/analytics/prostocks/:branchID', AdminAnalyticsController.getBranchProStocks);
router.get('/analytics/rawmaterials/:branchID/:proStockID', AdminAnalyticsController.getBranchRawMaterials);

module.exports = router;