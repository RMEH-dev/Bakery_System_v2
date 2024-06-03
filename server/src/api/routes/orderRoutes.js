const express = require('express');
const router = express.Router();
const OrderController =  require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get("/trackOrders", OrderController.trackOrders);
router.get("/order/getOrderDetails/:id", OrderController.getOrderDetails);
router.put("/updateOrder&PaymentStatus/:orderID", OrderController.updateOrderAndPaymentStatus);


module.exports = router;
