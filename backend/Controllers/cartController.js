const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");

const createCart = async (req, res) => {
  try {
    const { userId, productId, material, quantity } = req.body;
    if (!userId || !productId || !quantity || !material) {
      return res.status(400).json({
        message:
          "something is missing in userId,productId,or quantity or material",
      });
    }

    const existingItem = await Cart.findOne({ where: { userId, productId,material } });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ message: "Added To Cart" });
    }
    const newCart = await Cart.create({
      userId,
      productId,
      material,
      quantity,
    });
    res.status(200).json(newCart);
    console.log("item added to cart");
  } catch (error) {
    res.status(500).json({ message: "erroradding to cart" });
    console.log(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID Is Required" });
    }
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["name", "price", "material", "images", "categoryId"],
        },
      ],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
    console.log(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res
      .status(200)
      .json({ message: "Quantity updated successfully", cartItem });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cartId = req.params;
    const cartItem = await Cart.findOne(cartId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await cartItem.destroy();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createCart, getCart, updateCart,removeCartItem};
