import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, userToken } from "../Component/Variable";
import { Label } from "reactstrap";

const Orders = () => {
  const userData = userToken();
  const token = userData?.token;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem("token");

  const orderStatusOptions = [
    { value: 1, label: "Pending" },
    { value: 2, label: "Processing" },
    { value: 3, label: "Shipped" },
    { value: 4, label: "Delivered" },
    { value: 5, label: "Cancelled" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/order/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response order", response.data);

        setOrders(response.data.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/order/updatestatus/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order status updated successfully!");
      setOrders((prevOrders) =>
        prevOrders?.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Orders</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.length > 0 ? (
              orders?.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col md:flex-row justify-between items-center"
                >
                  <div className="text-sm md:text-base w-full md:w-2/3">
                    <p>
                      <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Customer Name:</strong>
                      {order.firstName} {order.lastName}{" "}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition"
                    >
                      <Eye size={16} /> View Details
                    </button>
                    <select
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      onChange={(e) => {
                        updateOrderStatus(order.orderId, e.target.value);
                        console.log("target", e.target.value);
                      }}
                      value={order.status}
                    >
                      {orderStatusOptions?.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No orders found.</p>
            )}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full text-white relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setSelectedOrder(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>User ID:</strong> {selectedOrder.userId}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.firstName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address1},
              {selectedOrder.apt}, {selectedOrder.address2},{selectedOrder.city}
              ,{selectedOrder.state}, {selectedOrder.country},{" "}
              {selectedOrder.postalCode}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <h3 className="font-semibold mt-4">Ordered Items:</h3>

            {selectedOrder?.orderItems?.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <img
                  src={`${API_URL}/${JSON.parse(item?.product?.images)[0]}`}
                  alt={item?.product?.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm">{item?.product?.name}</p>
                  <p className="text-sm text-gray-400">
                    Qty: {item.quantity} | ₹{item?.product?.price} each
                  </p>
                  <p className="text-sm text-gray-400">
                    Shipping: ₹{selectedOrder.shippingCharge} | Tax: ₹
                    {selectedOrder.tax}
                  </p>
                  <p className="text-sm text-gray-400 font-bold">
                    Total: ₹{selectedOrder.totalPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
