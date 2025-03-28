const {DataTypes}=require('sequelize')
const Sequelize=require('../config/db')

const Payment=Sequelize.define('payment',{
    paymentId:{
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
        }
    },
    orderId:{
        type:DataTypes.INTEGER,
        defaultValue:null,
        references:{
            model:'order',
            key:'orderId'
        }
    },
    paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false
    },
    transactionId:{
        type:DataTypes.STRING,
        unique:{ name: 'unique_transactionId', msg: 'transactionId must be unique'},
    },
    amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    status: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1,
        comment:'1-pending, 2-processing, 3-shipped ,4-delivered, 5-cancelled' 
    }
},
{
    tableName:'payment',
    timestamps:true
});

module.exports=Payment