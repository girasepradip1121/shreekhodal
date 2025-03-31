import { useEffect, useState } from "react";
import { API_URL, userToken } from "../Component/Variable";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const userData = userToken();
  const userId = userData?.userId;
  const token = userData?.token;

  const status = [
    { value: 1, label: "Pending" },
    { value: 2, label: "Processing" },
    { value: 3, label: "Shipped" },
    { value: 4, label: "Delivered" },
    { value: 5, label: "Cancelled" },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/userorder/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Bracket fix
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const openDeleteModal = (orderId) => {
    setDeleteOrderId(orderId);
    setIsModalOpen(true);
  };

  const confirmDeleteOrder = async () => {
    try {
      await axios.delete(`${API_URL}/order/remove/${deleteOrderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== deleteOrderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
    setIsModalOpen(false);
  };

  const orderList = Array.isArray(orders) ? orders : orders.orders || [];

  return (
    <div className="max-w-6xl mx-auto p-6 md:mt-25 mt-30 mb-10">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orderList.length === 0 ? (
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              No Orders Available
            </h2>
            <p className="text-gray-600 mt-2">Please Check Your Cart</p>
            <Link
              to="/cart"
              className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Check Cart
            </Link>
          </div>
        ) : (
          (Array.isArray(orderList) ? orderList : []).map((order) => (
            <div
              key={order.orderId}
              className="border p-4 rounded-lg shadow-md"
            >
              <h3 className="font-semibold">Order #{order.orderId}</h3>
              <p>Total: ₹{order.totalPrice?.toFixed(2)}</p>
              <p>
                Status:{" "}
                {status.find((s) => s.value === order.status)?.label ||
                  "Unknown"}
              </p>

              {/* Order Items */}
              <div className="mt-2">
                <h4 className="font-medium">Products:</h4>
                {order?.orderItems?.length > 0 ? (
                  order?.orderItems?.map((item, index) => {
                    const product = item.product || {};
                    const images = product.images
                      ? JSON.parse(product.images)
                      : [];
                    const imageUrl =
                      images.length > 0
                        ? `${API_URL}/${images[0]}`
                        : "/placeholder.jpg";

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-2 border-b"
                      >
                        <img
                          src={imageUrl}
                          alt={product.name || "Product Image"}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">
                            {product.name || "No Name"}
                          </p>
                          <p>Price: ₹{product.price || "N/A"}</p>
                          <p>Quantity: {item.quantity || "N/A"}</p>
                          <p>
                            Total: ₹
                            {(item.quantity * (product.price || 0)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No Products Found</p>
                )}
              </div>

              {/* Delete Button */}
              {order.status === 1 && (
                <button
                  onClick={() => openDeleteModal(order.orderId)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                  Delete Order
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
              Are you sure?
            </h2>
            <p className="mb-4 text-center">
              You want to delete this order permanently.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="px-4 py-2 bg-red-500 text-white rounded text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
