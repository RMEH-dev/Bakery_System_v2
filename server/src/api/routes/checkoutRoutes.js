const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/cart/:userId', checkoutController.getCart);




module.exports = router;