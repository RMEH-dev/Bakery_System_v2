const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

router.get('/getProfileInfo/:userId', profileController.getProfileInfo);
router.put('/updateuserprofile' , profileController.updateUserProfile)
router.get("/userOrders", profileController.userOrders);
router.get("/userAddress", profileController.getAddress);
router.post("/userAddress", profileController.addAddress);
router.put("/userAddress", profileController.updateAddress);


module.exports = router;