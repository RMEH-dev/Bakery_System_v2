const express = require('express');
const router = express.Router();
const allProductsController = require('../controllers/allProductsController');

router.get('/getProducts', allProductsController.getProducts);
router.get('/getCategories', allProductsController.getCategories);
router.get('/getProductsByCategory', allProductsController.getProductsByCategory);

module.exports = router;