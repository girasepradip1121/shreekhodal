const Product = require("../Models/productModel");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    const {
      images,
      name,
      discount,
      price,
      originalPrice,
      gender,
      description,
      stock,
      categoryId,
      material,
      deliverytime,
      deliverycharge,
      baseMetal,
      Polish,
      Occasion,
      Trend,
      Collection,
      NecklaceClasType,
      IdealsFor,
      color,
      NecklaceType,
      Warranty,
      Weight,
    } = req.body;
    console.log(req.body);

    const imageUrl = req.files
      ? req.files.map((file) => `${file.filename}`)
      : [];

    const formattedMaterial = Array.isArray(material)
      ? material // Already an array
      : material?.split(",").map((id) => id.trim());

    const newProduct = await Product.create({
      images: imageUrl,
      name,
      discount,
      price,
      originalPrice,
      gender,
      description,
      stock,
      categoryId,
      material: formattedMaterial,
      deliverytime,
      deliverycharge,
      baseMetal,
      Polish,
      Occasion,
      Trend,
      Collection,
      NecklaceClasType,
      IdealsFor,
      color,
      NecklaceType,
      Warranty,
      Weight,
    });
    console.log("newproduct", newProduct);

    res
      .status(200)
      .json({ success: "Product Created Successfully!", newProduct });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

// const getProducts = async (req, res) => {
//   try {
//     const { categoryId } = req.query; // Query param se categoryId le raha hai

//     let products;

//     if (categoryId) {
//       //Category ID hai toh us category ke products fetch karo
//       products = await Product.findAll({ where: { categoryId } });
//     } else {
//       // Category ID nahi hai toh sabhi products fetch karo
//       products = await Product.findAll();
//     }

//     res.status(200).json(products);
//     console.log("Products fetched successfully");
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//     console.log("Failed to fetch products:", error);
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     // Query Parameters ko extract karo
//     const {
//       categoryId,
//       baseMetal,
//       Polish,
//       Occasion,
//       Trend,
//       Collection,
//       IdealsFor,
//       color,
//       NecklaceType,
//       Warranty,
//       Weight,
//     } = req.query;

//     // Dynamic filtering ke liye 'where' object
//     let whereCondition = {};

//     if (categoryId) whereCondition.categoryId = categoryId;
//     if (baseMetal) whereCondition.baseMetal = baseMetal;
//     if (Polish) whereCondition.Polish = Polish;
//     if (Occasion) whereCondition.Occasion = Occasion;
//     if (Trend) whereCondition.Trend = Trend;
//     if (Collection) whereCondition.Collection = Collection;
//     if (IdealsFor) whereCondition.IdealsFor = IdealsFor;
//     if (color) whereCondition.color = color;
//     if (NecklaceType) whereCondition.NecklaceType = NecklaceType;
//     if (Warranty) whereCondition.Warranty = Warranty;
//     if (Weight) whereCondition.Weight = Weight;

//     // Find all products based on filters
//     const products = await Product.findAll({ where: whereCondition });

//     res.status(200).json(products);
//     console.log("Products fetched successfully");
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//     console.log("Failed to fetch products:", error);
//   }
// };

const getProducts = async (req, res) => {
  try {
    const {
      categoryId,
      baseMetal,
      Polish,
      Occasion,
      Trend,
      Collection,
      IdealsFor,
      color,
      NecklaceType,
      Warranty,
      Weight,
    } = req.query;

    let whereCondition = {};

    if (categoryId && categoryId !== "null") {
      whereCondition.categoryId = categoryId;
    }
    // ✅ Convert CSV strings to arrays & use Op.in for multiple values
    if (baseMetal) whereCondition.baseMetal = { [Op.in]: baseMetal.split(",") };
    if (Polish) whereCondition.Polish = { [Op.in]: Polish.split(",") };
    if (Occasion) whereCondition.Occasion = { [Op.in]: Occasion.split(",") };
    if (Trend) whereCondition.Trend = { [Op.in]: Trend.split(",") };
    if (Collection)
      whereCondition.Collection = { [Op.in]: Collection.split(",") };
    if (IdealsFor) whereCondition.IdealsFor = { [Op.in]: IdealsFor.split(",") };
    if (color) whereCondition.color = { [Op.in]: color.split(",") };
    if (NecklaceType)
      whereCondition.NecklaceType = { [Op.in]: NecklaceType.split(",") };
    if (Warranty) whereCondition.Warranty = { [Op.in]: Warranty.split(",") };
    if (Weight) whereCondition.Weight = { [Op.in]: Weight.split(",") };

    const products = await Product.findAll({ where: whereCondition });

    res.status(200).json(products);
    console.log("Products fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
    console.log("Failed to fetch products:", error);
  }
};

module.exports = { getProducts };

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch product", details: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const {
      images,
      name,
      price,
      originalPrice,
      gender,
      description,
      stock,
      categoryId,
      material,
      baseMetal,
      Polish,
      Occasion,
      Trend,
      Collection,
      NecklaceClasType,
      IdealsFor,
      color,
      NecklaceType,
      Warranty,
      Weight,
    } = req.body;

    const imageUrl =
      req.files && req.files.length > 0
        ? req.files.map((file) => `${file.filename}`)
        : product.images; // Purani images rakho agar naye nahi mile

    const formattedMaterial = Array.isArray(material)
      ? material // Already an array
      : material?.split(",").map((id) => id.trim());

    await product.update({
      images: imageUrl,
      name,
      price,
      originalPrice,
      gender,
      description,
      stock,
      categoryId,
      material: formattedMaterial,
      baseMetal,
      Polish,
      Occasion,
      Trend,
      Collection,
      NecklaceClasType,
      IdealsFor,
      color,
      NecklaceType,
      Warranty,
      Weight,
    });
    res.status(200).json({ success: "Product Updated Successfully", product });
  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.destroy();
    res.status(200).json({ success: "Product deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    // ✅ Get the product to find its category
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Fetch similar products in the same category, excluding the current product
    const recommendedProducts = await Product.findAll({
      where: {
        categoryId: product.categoryId,
        productId: { [Op.ne]: productId }, // Exclude the current product
      },
      limit: 4, // ✅ Limit the recommendations to 5 products
      order: [["createdAt", "DESC"]], // Show latest products first
    });

    res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    res.status(500).json({ error: "Error fetching recommended products" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getRecommendedProducts
};
