import React, { useEffect, useState } from "react";
import { ShoppingCart, Package, Users, MessageCircle,Tag } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL, userToken } from "../Component/Variable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    orders: 0,
    products: 0,
    users: 0,
    contact: 0,
    category: 0
  });
  const userData = userToken();
  const token = userData?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(`${API_URL}/order/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(ordersResponse.data)
      
        const productsResponse = await axios.get(`${API_URL}/product/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersResponse = await axios.get(`${API_URL}/user/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requestResponse = await axios.get(`${API_URL}/request/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const categoryResponse = await axios.get(`${API_URL}/category/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setCounts({
          orders: ordersResponse.data.orders.length,
          products: productsResponse.data.length,
          users: usersResponse.data.length,
          request: requestResponse.data.length,
          category: categoryResponse.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "Users",
      count: counts.users,
      icon: <Users size={40} className="text-gray-800" />,
      color: "bg-purple-500",
      link: "/admin/users",
    },
    {
      title: "Products",
      count: counts.products,
      icon: <Package size={40} className="text-gray-800" />,
      color: "bg-green-500",
      link: "/admin/products",
    },
    {
      title: "Orders",
      count: counts.orders,
      icon: <ShoppingCart size={40} className="text-gray-800" />,
      color: "bg-blue-500",
      link: "/admin/orders",
    },
    {
      title: "Request",
      count: counts.request,
      icon: <MessageCircle size={40} className="text-gray-800" />,
      color: "bg-yellow-500",
      link: "/admin/manage-contact",
    },
    {
      title: "Categories",
      count: counts.category,
      icon: <Tag size={40} className="text-gray-800" />,
      color: "bg-red-400",
      link: "/admin/category",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(card.link);
            }}
            className={`p-6 rounded-xl shadow-lg flex items-center gap-4 ${card.color} bg-opacity-90 `}
          >
            <div className="p-4 bg-white bg-opacity-20 rounded-lg flex item-centre justify-centre">
              {card.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-4xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
