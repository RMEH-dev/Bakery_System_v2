const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middlewares/authMiddleware');
const generateOrderID = require('../helpers/generateOrderID');

router.get('/cartCheckout/:userId', checkoutController.getCart);
router.get('/getAddress/:userId', checkoutController.getAddress);
router.post('/createOrder', checkoutController.createOrder);
router.get('/deliveryCharge/:option', checkoutController.getDeliveryCharge);
router.post('/createPayment', checkoutController.createPayment);
router.get('/generateOrderID', checkoutController.generateOrderID);
router.post('/createOrderDetails', checkoutController.createOrderDetails);
router.delete('/clearCart/:cartId', checkoutController.clearCart);

module.exports = router;