//Routing to the controller methods
const express = require('express');
const router = express.Router();
const {isAdmin, isStaff} = require('../middlewares/authMiddleware');
const proStockController = require('../controllers/proStockController');
const proStockInput = require('../validations/proStockInput');

router.get('/proStock', isAdmin, isStaff, proStockController.getProStockInfo);
router.post('/addProStock', isAdmin, isStaff, proStockInput.proStockInputValidate, proStockController.addProStock);
router.get('/getProStockNames', isAdmin, isStaff, proStockController.getProStockNames);
router.get('/getProStockIDs', isAdmin, isStaff, proStockController.getProStockIDs);
router.get('/getProStock/:id', isAdmin, isStaff, proStockController.getProStock);
router.put('/updateProStock/:id', isAdmin, isStaff, proStockController.updateProStock);

module.exports = router;