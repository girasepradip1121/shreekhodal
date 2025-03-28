const {DataTypes}=require('sequelize')
const Sequelize=require('../config/db')

const Product=Sequelize.define('product',{
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discount: {
        type: DataTypes.STRING,
        defaultValue:null
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    originalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue:null
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        defaultValue:null,
        references:{
            model:"category",
            key:"categoryId"
        }
    },
    material: {
        type: DataTypes.JSON,
        defaultValue:null
    },
    deliverytime: {
        type: DataTypes.INTEGER,
        defaultValue:null
    },
    deliverycharge: {
        type: DataTypes.INTEGER,
        defaultValue:null
    },
    baseMetal:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Polish:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Occasion:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Trend:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Collection:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    NecklaceClasType:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    IdealsFor:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NecklaceType:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Warranty:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    Weight:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
}, { 
    tableName:"product",
    timestamps: true 
    }
);

module.exports = Product;
