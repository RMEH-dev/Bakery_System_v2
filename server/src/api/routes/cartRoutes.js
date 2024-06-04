const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/cart', CartController.addToCart);
router.get("/cart/:id", CartController.getCartItems);
router.get('/cart/itemCount/:id', CartController.getCartItemCount);


module.exports = router;
