const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/cart/:userId', checkoutController.getCart);
router.get('/getAddress/:userId', checkoutController.getAddress);




module.exports = router;