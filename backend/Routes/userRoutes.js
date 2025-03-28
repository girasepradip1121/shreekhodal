const express=require('express')
const router=express.Router();
const userController=require('../Controllers/usercontroller')
const authMiddleware=require('../Middlewares/authMiddleware')


router.post('/login',userController.login)
router.post('/signup',userController.signup)
router.get('/getall',authMiddleware,userController.getUsers)

module.exports=router;