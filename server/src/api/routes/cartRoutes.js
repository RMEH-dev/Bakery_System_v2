const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/cart', CartController.addToCart);
router.get("/cart/:userId", CartController.getCartItems);
router.get('/cart/itemCount/:id', CartController.getCartItemCount);
router.post("/cart/remove", CartController.removeFromCart);
router.post("/cart/updateQuantity", CartController.updateCartItemQuantity);
router.post('/cart/updateTotal', CartController.updateCartTotal);


module.exports = router;
 