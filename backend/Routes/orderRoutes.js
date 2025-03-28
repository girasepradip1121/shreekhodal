const express=require('express')
const router=express.Router()
const orderController=require('../Controllers/orderController')
const authMiddleware=require('../Middlewares/authMiddleware')


router.post('/create',authMiddleware,orderController.createOrder);
router.get('/getall',authMiddleware,orderController.getOrders);
router.get('/userorder/:userId',authMiddleware,orderController.getUserOrders);
router.put('/updatestatus/:orderId',authMiddleware,orderController.updateOrderStatus);
router.delete('/remove/:orderId',authMiddleware,orderController.deleteOrder);

module.exports=router
