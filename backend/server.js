const express = require("express");
const app = express();
const sequelize = require("./config/db");
const cors = require("cors");
const index=require('./Models/index')
const Request=require('./Models/contactUsModel')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//import all routes
const userRoutes = require("./Routes/userRoutes");
const productRoutes=require("./Routes/prouctRoutes")
const cartRoutes=require('./Routes/cartRoutes')
const orderRoutes=require('./Routes/orderRoutes')
const contactUsRoutes=require('./Routes/contactUsRoutes')
const categoryRoutes=require('./Routes/categoryRoutes')


//routes ke use
app.use("/user", userRoutes);
app.use("/product",productRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);
app.use("/category",categoryRoutes);
app.use("/request",contactUsRoutes);




app.get("/", (req, res) => {
  res.send("Hello, Welcome To Shree Khodal Enterprise");
});

sequelize
  .sync() //alter:true use krna badme
  .then(() => {
    console.log("Database synced successfully...");
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
