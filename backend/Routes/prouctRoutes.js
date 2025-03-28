const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const upload = require("../Middlewares/uploadMiddleware");
const authMiddleware=require('../Middlewares/authMiddleware')


router.post(
  "/create",authMiddleware,
  upload.array("images", 5),
  productController.createProduct
);
router.get("/getall",productController.getProducts);
router.get("/getproductbyid/:productId", productController.getProductById);
router.put("/update/:productId", authMiddleware,productController.updateProduct);
router.delete("/delete/:productId",authMiddleware,productController.deleteProduct);
router.get('/recommended/:productId', productController.getRecommendedProducts);


module.exports = router;
