const {DataTypes}=require('sequelize')
const Sequelize=require('../config/db')

const Order=Sequelize.define("order",{
    orderId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        defaultValue:null,
        references:{
            model:'user',
            key:'userId'
        },
    },
    shippingCharge:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    tax:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    totalPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apt:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    postalCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1,
        comment:'1-pending, 2-processing, 3-shipped ,4-delivered, 5-cancelled' 
    }
},
{
    tableName:'order',
    timestamps:true
}

)

module.exports=Order