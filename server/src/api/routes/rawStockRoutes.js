//Routing to the Controller methods
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const rawStockController = require('../controllers/rawStockController');
const rawStockInput = require('../validations/rawStockInput');

router.get('/rawStock', isAdmin, rawStockController.rawStock);
router.post('/addRawStock', isAdmin, rawStockInput.rawStockInputValidate, rawStockController.addRawStock);
router.get('/getEditRawStock/:id', isAdmin, rawStockController.getRawStock);
router.put('/updateRawStock/:id', isAdmin, rawStockController.updateRawStock);

module.exports = router;