const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/cart', cartController.addToCart);


module.exports = router;
