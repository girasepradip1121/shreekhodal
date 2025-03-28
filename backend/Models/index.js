const sequelize = require('../config/db');
const User = require('./userModel');
const Category = require('./categoryModel');
const Product = require('./productModel');
const Cart = require('./cartModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');
const Payment = require('./paymentModel');
const Request=require('./contactUsModel')

// Relationships

// User & Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

// User & Cart (One-to-Many)
User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// User & Payment (One-to-Many)
User.hasMany(Payment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'userId' });

// Category & Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Product & Cart (One-to-Many)
Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// Product & OrderItem (One-to-Many)
Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Order & OrderItem (One-to-Many)
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Order & Payment (One-to-One)
Order.hasOne(Payment, { foreignKey: 'orderId', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = {
    User,
    Category,
    Product,
    Cart,
    Order,
    OrderItem,
    Payment,
    Request
};
