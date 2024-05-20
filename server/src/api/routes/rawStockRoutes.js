//Routing to the Controller methods
const express = require('express');
const router = express.Router();
const rawStockController = require('../controllers/rawStockController');
const rawStockInput = require('../validations/rawStockInput');

router.get('/rawStock', rawStockController.rawStock);
router.post('/addRawStock', rawStockInput.rawStockInputValidate, rawStockController.addRawStock);
router.get('/getEditRawStock/:id', rawStockController.getRawStock);
router.put('/updateRawStock/:id', rawStockController.updateRawStock);

module.exports = router;