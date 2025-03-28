import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, userToken } from "../Component/Variable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const [openSection, setOpenSection] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("Gold");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();
  const userData = userToken();

  const productImages = product?.images ? JSON.parse(product.images) : [];
  // const materials = product?.material ? product.material.split(",") : [];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const materials = [
    { value: 1, label: "Silver" },
    { value: 2, label: "Gold" },
    { value: 3, label: "Platinum" },
    { value: 4, label: "Wooden" },
  ];
  console.log("product", product, product?.material);

  // Backend se material aisa aa raha hai: ["1,2"]

  const filteredMaterials = materials.filter(
    (mat) => product?.material.includes(mat.value) // ✅ Correct Matching
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching product data...");
        const response = await axios.get(
          `${API_URL}/product/getproductbyid/${productId}`
        );
        console.log("API Response:", response); // Check API response
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!productId) return;
      try {
        const response = await axios.get(
          `${API_URL}/product/recommended/${productId}`
        ); // Adjusted to use ProductAPI
        console.log("response", response.data);

        if (response.status === 200 && Array.isArray(response.data)) {
          console.log("API Response (Recommendations):", response.data);
          setRelatedProducts(response.data);
        } else {
          console.error("Unexpected API response format:", response);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err.message);
      } finally {
      }
    };

    fetchRecommendations();
  }, [productId]);

  const handleAddToCart = async (userId, productId, material, quantity) => {
    try {
      if (!userData?.token) {
        toast.error("Please login to add items to cart.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      const response = await axios.post(`${API_URL}/cart/create`, {
        userId: userData.userId,
        productId: product.productId,
        material: selectedMaterial,
        quantity: 1,
      });
      if (response.status === 200) {
        toast.success("Item added to Cart Successfully!");
        return response.data;
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add item to cart!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl mx-auto p-6 md:flex gap-8 md:mt-25 mt-30 mb-10">
        {/* Left: Product Images */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {product && productImages ? (
            productImages?.map((img, index) => (
              <img
                key={index}
                src={`${API_URL}/${img}`}
                alt={`jewel-${index}`}
              />
            ))
          ) : (
            <p>Loading images...</p>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex-1">
          <h1 className="text-[28px] font-[600] font-[Inter]">
            {product?.name}
          </h1>
          <p className="text-[16px] mt-1 font-[Inter] font-[400]">
            {product?.gender}
          </p>
          <p className="text-[16px] font-semibold mt-3 font-[Inter]">
            ₹{product?.price}{" "}
            <span className="text-gray-400 line-through">
              {product?.originalPrice}
            </span>
          </p>

          {/* Material Selection */}
          <h3 className="text-md mt-6 font-[Inter]">Choose Material</h3>
          <div className="flex gap-3 mt-2">
            {filteredMaterials?.map((option) => (
              <button
                key={option.value}
                value={option.value}
                onClick={() => setSelectedMaterial(option.value)}
                className={`px-4 py-2 border md:w-[145px] font-[Inter] text-sm ${
                  selectedMaterial === option.value
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700"
                } transition-all duration-300`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              className="md:w-[469px] w-full py-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full font-[Inter]"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
            <button
              className="md:w-[469px] w-full py-3 border border-gray-300 font-semibold rounded-full font-[Inter]"
              onClick={(e) => handleAddToCart()}
            >
              Add to Cart
            </button>
          </div>

          {/* Stock Info */}
          <p className="mt-5 text-gray-600 text-sm font-[Inter]">
            Stock Available: {product?.stock} Pieces
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-4 font-[Inter]">
            {product?.description}
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-3 font-[Inter] ">
            <li>Colour Shown : {product?.color}</li>
            <li>Style: {product?.style}</li>
          </ul>
          <div className="mt-6 border-t font-[Inter]">
            {/* Free Delivery & Returns */}
            <button
              onClick={() => toggleSection("delivery")}
              className="w-full text-[20px] flex justify-between items-center py-3 text-left font-medium font-[Inter]"
            >
              {" "}
              Free Delivery & Returns
              <span className="text-xl">
                {openSection === "delivery" ? "−" : "+"}
              </span>
            </button>
            {openSection === "delivery" && (
              <div className="p-3 text-gray-600 border-t text-[16px]">
                Delivery Time : {product.deliverytime} Days
                <br />
                Delivery Charge : ₹{product.deliverycharge}
                <br />
              </div>
            )}

            {/* Reviews Section */}
            <button
              onClick={() => toggleSection("reviews")}
              className="w-full flex text-[20px] justify-between items-center py-3 text-left font-medium border-t border-b font-[Inter]"
            >
              Reviews ({product?.review})
              <span className="text-xl">
                {openSection === "reviews" ? "−" : "+"}
              </span>
            </button>
            {openSection === "reviews" && (
              <div className="p-3 text-gray-600 border-t text-[16px]">
                No reviews yet. Be the first to write one!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggestion Section */}
      <div>
        <h1 className="text-center text-[30px] font-[Inter] font-[600]">
          YOU MIGHT ALSO LIKE
        </h1>
      </div>

      {/* Product Grid */}
      <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ml-[5%] mr-[5%] justify-items-center">
        {relatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    `${API_URL}/${JSON.parse(product.images)[0]}`
  );
  const navigate = useNavigate();
  const [isWishlist, setIsWishlist] = useState(false);

  const colors = [
    {
      name: "Silver",
      code: "#C0C0C0",
      img: `${API_URL}/${JSON.parse(product.images)[0]}`,
    },
    {
      name: "Gold",
      code: "#FFD700",
      img:
        `${API_URL}/${JSON.parse(product.images)[1]}` ||
        `${API_URL}/${JSON.parse(product.images)[0]}`,
    },
    {
      name: "Platinum",
      code: "#E5E4E2",
      img:
        `${API_URL}/${JSON.parse(product.images)[2]}` ||
        `${API_URL}/${JSON.parse(product.images)[0]}`,
    },
  ];

  const handleProductClick = () => {
    navigate(`/shopping/${product.productId}`);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevents navigation when clicking on wishlist
    setIsWishlist(!isWishlist);
  };

  return (
    <div
      className="bg-white w-full sm:w-[270px] h-auto shadow-sm p-4 rounded-md relative cursor-pointer flex flex-col justify-between"
      onClick={() => handleProductClick(product.productId)}
    >
      {/* Wishlist Icon */}
      <button className="absolute top-4 right-4 z-10" onClick={toggleWishlist}>
        <i
          className={`fa-solid fa-heart w-5 h-5 ${
            isWishlist ? "text-black" : "text-gray-500"
          } text-xl`}
        ></i>
      </button>

      {/* Product Image */}
      <div
        className="relative flex justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full sm:w-[260px] h-[250px] object-cover"
        />

        {/* Add to Cart Button (Visible on Hover) */}
        <button
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white rounded-md transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => handleProductClick(product.productId)}
        >
          Add to Cart
        </button>
      </div>

      {/* Discount */}
      <p className="text-[14px] font-[200] text-gray-400 mt-2 text-left">
        {product.discount}
      </p>

      {/* Colors */}
      <div className="flex space-x-2 mt-2 justify-start">
        {colors?.map((color, index) => (
          <span
            key={index}
            className="w-[24px] h-[24px] rounded-full border cursor-pointer"
            style={{ backgroundColor: color.code }}
            onMouseEnter={() => setSelectedImage(color.img)}
            onMouseLeave={() =>
              setSelectedImage(`${API_URL}/${JSON.parse(product.images)[0]}`)
            }
            onClick={(e) => e.stopPropagation()} // Prevents navigation when clicking on color
          ></span>
        ))}
      </div>

      {/* Product Name */}
      <h3 className="text-[14px] font-medium mt-1 text-left">{product.name}</h3>

      {/* Price */}
      <p className="text-[14px] font-[400] text-[#B53A3A] mt-2 text-left">
        {product.price}{" "}
        <span className="text-gray-400 line-through">
          {product.originalPrice}
        </span>
      </p>
    </div>
  );
};
export default SingleProduct;
