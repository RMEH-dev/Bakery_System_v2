const express = require('express');
const router = express.Router();
const allProductsController = require('../controllers/allProductsController');



router.get('/getProducts', allProductsController.getProducts);
router.get('/products/:id', allProductsController.getProductById);
router.get('/getCategories', allProductsController.getCategories);
router.get('/searchProducts', allProductsController.searchProducts);
router.get('/getProductsByCategory', allProductsController.getProductsByCategory);


module.exports = router;