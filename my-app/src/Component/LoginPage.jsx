import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "./Variable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/user/login`, formData);
      localStorage.setItem("token", JSON.stringify(response.data.user));
      console.log(response.data);
      toast.success("Login Successful ");
      setMessage("Login successful!");
      setTimeout(() => {
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to login. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" flex items-center justify-center md:mt-25 mt-30 mb-10">
        <div className="bg-white p-6 w-[440px]">
          <h2 className="text-[36px] font-bold mb-6 text-center font-[Poppins]">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-full"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-full w-full hover:bg-gray-600"
            >
              Login
            </button>
          </form>
          {message && (
            <p className="text-green-600 mt-4 text-center">{message}</p>
          )}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          <p className="text-sm text-gray-600 mt-4 text-center">
            New User?{" "}
            <Link to="/signup" className="text-[#BB7E5B] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
