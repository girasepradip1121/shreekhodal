const express=require('express')
const router=express.Router();
const categoryController=require('../Controllers/categoryController')
const upload=require('../Middlewares/uploadMiddleware')
const authMiddleware=require('../Middlewares/authMiddleware')


router.post('/create',upload.single("image"),authMiddleware,categoryController.createCategory)
router.get('/getall',categoryController.getCategory)
router.put('/update/:categoryId',authMiddleware,upload.single("image"),categoryController.updatecategory)
router.delete('/delete/:categoryId',authMiddleware,categoryController.deleteCategory)

module.exports=router;