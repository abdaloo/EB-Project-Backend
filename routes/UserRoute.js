const exp = require('express');
const router = exp.Router();
const { CreateUser,LoginUser,UpdateUser,DeleteUser,GetUserAll,GetSpecificUser,PlantsData } = require('../controllers/UserController');
const {AddToCart} = require('../controllers/CartController');

router.post('/createUser', CreateUser);
router.post('/loginUser', LoginUser);
router.put('/updateUser/:id', UpdateUser);
router.delete('/deleteUser/:id', DeleteUser);
router.get('/getUserAll', GetUserAll);
router.get('/getSpecificUser/:email', GetSpecificUser);
router.post('/addToCart', AddToCart);

module.exports = router;