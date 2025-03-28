const { where } = require("sequelize");
const Category = require("../Models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    const category =await Category.create({
      name,image
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error to add category" });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "error to get category" });
  }
};

const updatecategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;


    await Category.update({ name,image }, { where: { categoryId } });
    const updateCategory = await Category.findOne({ where: { categoryId } });
    res
      .status(200)
      .send({
        message: "Category Updated Successfully",
        Category: updateCategory,
      });
    console.log("Update Category", categoryId, updateCategory);
  } catch (error) {
    res.status(500).json({ message: "error to get category" });
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log("params",req.params);
    
    const category = await Category.findByPk(categoryId);
    console.log("category",category);
    
    if (!category) return res.status(404).json({ error: "CATEGORY not found" });
    await category.destroy();
    res.status(200).json({ success: "Category deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

module.exports = { createCategory, getCategory, updatecategory ,deleteCategory};
