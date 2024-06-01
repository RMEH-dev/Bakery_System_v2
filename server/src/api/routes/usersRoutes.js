const usersController = require('../controllers/usersController');
const router = require('./rawStockRoutes');

router.get('/getUsers', usersController.getUsers);
router.get('/editUsers/:id', usersController.editUsers);
router.post('/addUser', usersController.addUser);
router.get('/getUserTypes', usersController.getUserTypes);
router.get('/getBranchName', usersController.getBranchName);
router.put('/updateUser/:id', usersController.updateUser);
router.delete('/deleteUser/:id', usersController.deleteUser);



module.exports = router;