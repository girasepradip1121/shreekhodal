import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, userToken } from "../Component/Variable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Cart = () => {
  const userData = userToken();
  const userId = userData?.userId;
  const token = userData?.token;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart/getAll/${userId}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response.data);

      setCartItems(response.data);
    } catch (err) {
      console.log("Failed to fetch cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    try {
      fetchCartItems(userId);
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthenticated(false);
    }
  }, [token]);

  const updateQuantity = async (cartId, change) => {
    try {
      const updatedItem = cartItems.find((item) => item.cartId === cartId);
      if (!updatedItem) return;

      const newQuantity = updatedItem.quantity + change;
      if (newQuantity < 1) return;

      await axios.put(`${API_URL}/cart/update/${cartId}`, {
        quantity: newQuantity,
      });

      // 🔹 UI Update
      setCartItems((prevItems) =>
        prevItems?.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  const removeItem = async (cartId) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${cartId}`);

      // 🔹 UI Se Item Remove Karna
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartId !== cartId)
      );
      toast.success("Item Removed From Cart")
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
    }
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }
    navigate('/checkout', { state: { cartItems, subtotal } });
  };

  const subtotal = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
    <ToastContainer/>
      <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg md:mt-25 mt-30 mb-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !isAuthenticated ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">
              Please login to check your cart!
            </strong>
            <p className="mt-2">
              You must be logged in to proceed with checkout.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Login Now
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mt-2">
              Please add some items to proceed with checkout.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div>
            <div className="hidden md:block">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 font-[Inter]">
                    <th className="p-3 text-left font-[500]">Product</th>
                    <th className="p-3 font-[500]">Price</th>
                    <th className="p-3 font-[500]">Quantity</th>
                    <th className="p-3 font-[500]">Subtotal</th>
                    <th className="p-3 font-[500]">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr
                      key={item.cartId}
                      className="border-t border-gray-200 font-[Inter]"
                    >
                      <td className="p-3 flex items-center gap-4">
                        <img
                          src={`${API_URL}/${
                            JSON.parse(item.product.images)[0]
                          }`}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover"
                        />
                        {item.name}
                      </td>
                      <td className="p-3 text-center">
                        ₹{item.product?.price}
                      </td>
                      <td className="p-3 text-center flex items-center justify-center gap-2">
                        <button
                          className="bg-gray-300 h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.cartId, -1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="bg-gray-300 h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.cartId, 1)}
                        >
                          +
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        ₹{item.product.price * item.quantity}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.cartId)}
                        >
                          <Trash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              {cartItems?.map((item) => (
                <div
                  key={item.cartId}
                  className="border border-gray-200 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`${API_URL}/${JSON.parse(item.product.images)[0]}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600">₹{item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <button
                        className="bg-gray-300 h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.cartId, -1)}
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{item.quantity}</span>
                      <button
                        className="bg-gray-300 h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.cartId, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">
                      ₹{item.product.price * item.quantity}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.cartId)}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons & Cart Summary */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center font-[Inter]">
              <button className="px-4 py-2 border rounded-md w-full md:w-auto mb-2 md:mb-0">
                Return To Shop
              </button>
            </div>

            <div className="mt-6 border border-gray-300 p-4 rounded-md shadow-sm leading-[30px] md:w-[500px] font-[Inter]">
              <h2 className="font-semibold text-lg">Cart Total</h2>
              <p>Subtotal: ₹{subtotal}</p>
              <p>Shipping: Free</p>
              <p className="font-semibold">Total: ₹{subtotal}</p>
              <button
                className="mt-4 px-6 py-2 bg-black text-white rounded-md md:w-[450px] transition duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={()=>handleCheckout()}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
