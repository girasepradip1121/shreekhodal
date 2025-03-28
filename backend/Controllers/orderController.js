const Order = require("../Models/orderModel");
const OrderItem = require("../Models/orderItemModel");
const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      shippingCharge,
      tax,
      totalPrice,
      paymentMethod,
      phone,
      email,
      firstName,
      lastName,
      address1,
      apt,
      address2,
      city,
      country,
      state,
      postalCode,
      status,
      orderItems,
    } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items cannot be empty" });
    }

    const order = await Order.create({
      userId,
      shippingCharge,
      tax,
      totalPrice,
      paymentMethod,
      phone,
      email,
      firstName,
      lastName,
      address1,
      apt,
      address2,
      city,
      country,
      state,
      postalCode,
      status: 1,
    });

    const orderItemsData = orderItems?.map((item) => ({
      orderId: order.orderId,
      productId: item.productId,
      price: item.price,
      quantity: item.quantity,
      totalAmount: item.price * item.quantity,
    }));
    console.log("items", orderItems);

    await OrderItem.bulkCreate(orderItemsData);
    res.status(201).json({ message: "Order created successfully", order });
    console.log("order place successfully");
    await Cart.destroy({ where: { userId } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [
            { model: Product, attributes: ["name", "price", "images"] },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },

      include: [
        {
          model: OrderItem,
          include: [
            { model: Product, attributes: ["name", "price", "images"] },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log("Fetched Orders:", orders);
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch user orders", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.update({ status });
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params;
    const order = await Order.findOne({where:{orderId}});
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.destroy({ where: { orderId } });
    res.status(200).json({ message: "Order deleted successfully" });
    console.log("order deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};
