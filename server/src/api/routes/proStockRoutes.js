//Routing to the controller methods
const express = require('express');
const multer = require('multer');
const router = express.Router();
const {isAdmin, isStaff} = require('../middlewares/authMiddleware');
const proStockController = require('../controllers/proStockController');
const proStockInput = require('../validations/proStockInput');
const  checkBranchAccess  = require('../middlewares/userRoleBranch');

const upload = multer({storage: multer.memoryStorage()});


// router.post('/upload', upload.single('file'), proStockController.uploadFile)
router.get('/proStock',  proStockController.getProStockInfo);
router.post('/addProStock',  proStockInput.proStockInputValidate, proStockController.addProStock);
router.get('/getProStockNames',  proStockController.getProStockNames);
router.get('/getProStockCategory', proStockController.getProStockCategory);
router.get('/getProStockSubCategory', proStockController.getProStockSubCategory);
router.get('/getProStockIDs',  proStockController.getProStockIDs);
router.get('/getProStock/:id',  proStockController.getProStock);
router.put('/updateProStock/:id', proStockController.updateProStock);

module.exports = router;