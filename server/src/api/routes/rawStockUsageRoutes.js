const rawStockUsageController = require('../controllers/rawStockUsageController');
const router = require('./rawStockRoutes');

router.get('/getRawStockUsage', rawStockUsageController.getRawStockUsage);
router.get('/editRawStockUsage/:id',rawStockUsageController.editRawStockUsage);
router.get('/getRawStockNameUsage', rawStockUsageController.getRawStockNameUsage);
router.get('/getProStockNameUsage', rawStockUsageController.getProStockNameUsage);
router.get('/getRawStockIDUsage', rawStockUsageController.getRawStockIDUsage);
router.get('/getProStockIDUsage', rawStockUsageController.getProStockIDUsage);
router.post('/addRawStockUsage', rawStockUsageController.addRawStockUsage);
router.put('/updateRawStockUsage/:id', rawStockUsageController.updateRawStockUsage);


module.exports = router;