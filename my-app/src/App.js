import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import Category from "./Pages/Category.jsx";
import SingleProduct from "./Pages/SingleProduct.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Cart from "./Pages/Cart.jsx";
import LoginPage from "./Component/LoginPage.jsx";
import SignupPage from "./Component/SignupPage.jsx";
import Navbar from "./Component/Header.jsx";
import Footer from "./Component/Footer.jsx";
import OrderSuccess from "./Pages/Order-success.jsx";
import MyOrders from "./Pages/MyOrders.jsx";

import Dashboard from "./AdminPages/Dashboard.jsx"
import Products from "./AdminPages/Product.jsx"
import Orders from "./AdminPages/Orders.jsx"
import Users from "./AdminPages/Users.jsx"
import ManageContact from "./AdminPages/ManageContact.jsx"
import AdminCategory from "./AdminPages/AdminCategory.jsx"
import AdminLayoutComponent from "./Component/AdminLayoutComponent.jsx"
import AdminRoutes from "./utils/AdminRoutes.jsx"





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shopping" element={<Category />} />
                <Route
                  path="/shopping/:productId"
                  element={<SingleProduct />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/ordersuccess" element={<OrderSuccess />} />
                <Route path="/myorders" element={<MyOrders />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* ✅ Admin Panel Routes (Protected with AdminRoute) */}
        <Route
          path="/admin/*"
          element={
            <AdminRoutes>
              <AdminLayoutComponent />
            </AdminRoutes>
          }
        >
          <Route index element={<Dashboard/>} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="manage-contact" element={<ManageContact />} />
          <Route path="category" element={<AdminCategory />} />
          
        </Route>

        {/* Catch-All for Unauthorized Access */}
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
