//Routing to the Controller methods
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const rawStockController = require('../controllers/rawStockController');
const rawStockInput = require('../validations/rawStockInput');

router.get('/rawStock',  rawStockController.rawStock);
router.post('/addRawStock', rawStockController.addRawStock);
router.get('/getRawStockNames',  rawStockController.getRawStockNames);
router.get('/getRawStockCategory', rawStockController.getRawStockCategory);
router.get('/getSupplier',  rawStockController.getSupplier);
router.get('/getUnits',  rawStockController.getUnits);
router.get('/getEditRawStock/:id', rawStockController.getRawStock);
router.put('/updateRawStock/:id', rawStockController.updateRawStock);

module.exports = router;