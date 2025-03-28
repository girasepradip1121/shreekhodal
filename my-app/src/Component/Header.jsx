import { useCallback, useEffect, useState } from "react";
import {
  FaSearch,
  FaRegUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBox,
  FaUserPlus,
} from "react-icons/fa";
import Logo from "../Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, userToken } from "./Variable";
import axios from "axios";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const userData = userToken() || {};
  const userId = userData?.userId;

  useEffect(() => {
    if (userData && userData?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    navigate("/login");
    window.location.reload(); // Forcefully reload to reset state
  };

  const getCart = useCallback(async () => {
    if (!userId) return; // User logged in nahi hai toh API call mat karo
  
    try {
      const response = await axios.get(`${API_URL}/cart/getall/${userId}`);
      setCartCount(response.data.length);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  }, [userId]); // Function tabhi recreate hoga jab userId change hogi
  
  useEffect(() => {
    if (isAuthenticated) {
      getCart(); // Sirf jab user logged in ho tabhi API call karein
    }
  }, [getCart, isAuthenticated]); // Only trigger when authentication status or userId changes
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".category-menu") &&
        !event.target.closest(".collections-menu")
      ) {
        setIsDropdownOpen(false);
        setIsCategoryOpen(false);
        setIsCollectionsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/category/getall`);
        setCategories(response.data);
        console.log("categories", response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 h-fit">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left - Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Center - Logo */}
        <div
          style={{ fontFamily: "EB Garamond" }}
          className="absolute left-1/2 transform md:-translate-x-1 -translate-x-1/2 md:relative md:left-0 flex items-center gap-2 text-[30px] tracking-wide font-serif"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-7 md:w-10 md:h-10 h-7 "
            onClick={() => navigate("/")}
          />
          JEWNX
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium justify-center">
          <Link
            to={"/shopping"}
            className="hover:text-gray-900 text-[#151313] font-[Lato]"
          >
            New Arrival
          </Link>

          {/* Shop by Category */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryOpen(!isCategoryOpen);
              }}
              className="hover:text-gray-900 flex items-center text-[#151313] font-[Lato] cursor-pointer"
            >
              Shop by Category <span className="ml-1">+</span>
            </button>
            {isCategoryOpen && (
              <div
                className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40 font-[Lato] z-50 category-menu"
                onMouseLeave={() => setIsCategoryOpen(false)} // Mouse ke bahar jane pe band ho
              >
                {categories?.map((category) => (
                  <Link
                    key={category.categoryId}
                    to={`/shopping?categoryId=${category.categoryId}`} // URL query params
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    {category.name ? category.name : "Unnamed"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Shop by Collections */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollectionsOpen(!isCollectionsOpen);
              }}
              className="hover:text-gray-900 flex items-center font-[Lato]"
            >
              Shop by Collections <span className="ml-1">+</span>
            </button>
            {isCollectionsOpen && (
              <div
                className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40 font-[Lato]  collections-menu"
                onClick={() => setIsCollectionsOpen(false)}
              >
                <Link
                  to={"/shopping"}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Minimal
                </Link>
                <Link
                  to={"/shopping"}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Luxury
                </Link>
              </div>
            )}
          </div>

          <Link to={"#"} className="hover:text-gray-900 font-[Lato]">
            Gift
          </Link>
        </div>

        {/* Right - Search, Cart */}
        <div className="flex items-center space-x-4 text-gray-700">
          {/* Desktop Search */}
          <div className="hidden md:block">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center  border-gray-500">
              {isSearchOpen ? (
                <div className="flex items-center border-b-2 space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 text-lg outline-none"
                    autoFocus
                  />
                  <FaTimes
                    className="text-xl cursor-pointer hover:text-gray-900"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <FaSearch
                  onClick={() => setIsSearchOpen(true)}
                  className="text-xl cursor-pointer hover:text-gray-900"
                />
              )}
            </div>
          </div>

          {/* Mobile Search Box (Always Visible Below Header) */}
          <div className="w-full bg-white shadow-md px-6 py-2 absolute top-full left-0 z-50 md:hidden flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <div className="relative cursor-pointer">
            <FaShoppingBag
              className="text-xl cursor-pointer transition duration-300 hover:text-gray-900"
              onClick={() => navigate("/cart")}
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <div className="relative">
            <FaRegUser
              className="text-xl cursor-pointer hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-left w-full hover:bg-gray-100"
                      onClick={() => navigate("/myorders")}
                    >
                      <FaBox className="text-lg" />{" "}
                      <span className="text-sm">Orders</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-left w-full hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="text-lg" />{" "}
                      <span className="text-sm">Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-left w-full hover:bg-gray-100"
                    onClick={() => navigate("/login")}
                  >
                    <FaUserPlus className="text-lg" />{" "}
                    <span className="text-sm">Login / Signup</span>
                  </button>
                )}
              </div>
            )}
          </div>
          {/* Cart Icon with Badge */}
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 bg-opacity-50 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start z-50">
          {/* User Icon in Mobile Menu */}
          <div className="flex justify-left border-b-2 w-full py-4 space-x-6">
            <FaRegUser className="text-xl cursor-pointer hover:text-gray-900 ml-5 bg-red-200 rounded-full text-[25px] p-1" />
            <p className="font-[Lato]">{userData.name}</p>
          </div>

          <Link
            to={"/shopping"}
            className="block py-3 px-6 w-full hover:bg-gray-100 font-[Lato]"
          >
            New Arrival
          </Link>

          {/* Shop by Category - Mobile */}
          <div className="w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryOpen(!isCategoryOpen);
              }}
              className="py-3 px-6 w-full text-left hover:bg-gray-100 flex justify-between"
            >
              Shop by Category <span>+</span>
            </button>
            {isCategoryOpen && (
              <div className="bg-gray-100">
                {categories?.map((category) => (
                  <Link
                    key={category.categoryId}
                    to={`/shopping?categoryId=${category.categoryId}`} // 👈 URL query params
                    className="block py-2 px-8 border-b hover:bg-gray-200"
                  >
                    {category.name ? category.name : "Unnamed"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Shop by Collections */}
          <div className="w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollectionsOpen(!isCollectionsOpen);
              }}
              className="py-3 px-6 w-full text-left hover:bg-gray-100 flex justify-between"
            >
              Shop by Collections <span className="ml-1">+</span>
            </button>
            {isCollectionsOpen && (
              <div className="bg-gray-100">
                <Link
                  to={"/shopping"}
                  className="block py-2 px-8 border-b hover:bg-gray-200 font-[Lato]"
                >
                  Minimal
                </Link>
                <Link
                  to={"/shopping"}
                  className="block py-2 px-8 border-b hover:bg-gray-200"
                >
                  Luxury
                </Link>
              </div>
            )}
          </div>
          <Link to={"#"} className="block py-3 px-6 w-full hover:bg-gray-100">
            Gift
          </Link>
        </div>
      )}
    </nav>
  );
}
