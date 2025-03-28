import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Bangle from "../Images/Bangle.png";
import Rings from "../Images/Ring.jpg";
import Woman1 from "../Images/Woman1.jpg";
import { API_URL } from "../Component/Variable";
import axios from "axios";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openFilters, setOpenFilters] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filters, setFilters] = useState({});

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  console.log(categoryId, "id");

  const toggleFilter = (title) => {
    setOpenFilters((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const attributeOptions = [
    {
      title: "Base Metal",
      field: "baseMetal", //Match with database column
      options: [
        { id: 1, name: "Brass" },
        { id: 2, name: "Oxidised Silver" },
        { id: 3, name: "Stone" },
        { id: 4, name: "Merable" },
      ],
    },
    {
      title: "Polish",
      field: "Polish", //Match with database column
      options: [
        { id: 1, name: "Gold Polish" },
        { id: 2, name: "Silver Polish" },
        { id: 3, name: "Rose Gold Polish" },
      ],
    },
    {
      title: "Occasion",
      field: "Occasion", //Match with database column
      options: [
        { id: 1, name: "Wedding" },
        { id: 2, name: "Party Wear" },
        { id: 3, name: "Work Wear" },
        { id: 4, name: "Religions" },
        { id: 5, name: "Love" },
        { id: 6, name: "Function" },
        { id: 7, name: "Engagement" },
        { id: 8, name: "Ethnic Party" },
      ],
    },
    {
      title: "Trend",
      field: "Trend", //Match with database column
      options: [
        { id: 1, name: "American Diamond Jewellery" },
        { id: 2, name: "Handcrafted" },
        { id: 3, name: "Oxidised Silver" },
        { id: 4, name: "Pearl" },
        { id: 5, name: "Ethnic Choker" },
        { id: 6, name: "Contemporary Choker" },
        { id: 7, name: "Traditional" },
      ],
    },
    {
      title: "Collection",
      field: "Collection", //Match with database column
      options: [
        { id: 1, name: "Ethnic" },
        { id: 2, name: "Contemporary" },
        { id: 3, name: "Oxidised" },
      ],
    },
    {
      title: "Ideals for",
      field: "IdealsFor", //Match with database column
      options: [
        { id: 1, name: "Girls" },
        { id: 2, name: "Women" },
      ],
    },
    {
      title: "Color",
      field: "color", //Match with database column
      options: [
        { id: 1, name: "Black" },
        { id: 2, name: "Blue" },
        { id: 3, name: "Brown" },
        { id: 4, name: "Red" },
        { id: 5, name: "Green" },
      ],
    },
    {
      title: "Necklace Type",
      field: "NecklaceType", //Match with database column
      options: [
        { id: 1, name: "Choker" },
        { id: 2, name: "Bridal" },
      ],
    },
    {
      title: "Warranty",
      field: "Warranty", //Match with database column
      options: [
        { id: 1, name: "6 Months" },
        { id: 2, name: "1 Year" },
      ],
    },
    {
      title: "Weight",
      field: "Weight", //Match with database column
      options: [
        { id: 1, name: "30g" },
        { id: 2, name: "40g" },
        { id: 3, name: "50g" },
      ],
    },
  ];

  const handleFilterChange = (filterField, value) => {
    setFilters((prevFilters) => {
      return {
        [filterField]: prevFilters[filterField]?.includes(value)
          ? prevFilters[filterField].filter((v) => v !== value) // Agar already selected hai to remove karo
          : [...(prevFilters[filterField] || []), value], // Naya option add karo
      };
    });
  };

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();

      // ✅ Agar selectedCategoryId null ya undefined ho, toh backend ko "null" bhejo
      if (selectedCategoryId) {
        queryParams.append("categoryId", selectedCategoryId);
      } else if (categoryId) {
        queryParams.append("categoryId", categoryId); // Backend ko clear signal milega ki sari categories chahiye
      } else {
        queryParams.append("categoryId", "null"); // Backend ko clear signal milega ki sari categories chahiye
      }

      // Filters ko URL query params me convert karo
      Object.keys(filters).forEach((key) => {
        if (filters[key].length > 0) {
          queryParams.append(key, filters[key].join(",")); // Convert array to comma-separated string
        }
      });

      const url = `${API_URL}/product/getall?${queryParams.toString()}`;
      console.log("API Request:", url);

      const response = await axios.get(url);
      console.log("Filtered Products:", response.data);

      //Products ko sorting ke saath set karo
      const sortedProducts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error Fetching Products:", error);
      setProducts([]); //Error ke case me empty product list set karo
    }
  };

  console.log("products", products);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProducts(selectedCategoryId);
    } else {
      fetchProducts();
    }
  }, [selectedCategoryId, filters]);

  useEffect(() => {
    fetchcategories();
  }, []);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  const fetchcategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category/getall`);
      setCategories(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    console.log("Clicked Category ID:", categoryId); // Debugging ke liye
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-[150px] md:h-full bg-[#f6f5f4]  md:mt-25 mt-30 mb-10">
        <img src={Bangle} alt="Jewelry" className="w-full object-cover" />
        <div className="absolute top-1/2 left-5 md:left-10 transform -translate-y-1/2 text-black">
          <h1
            className="text-[40px] md:text-[70px] font-bold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            JNWEX
          </h1>
          <h2
            className="text-xl md:text-3xl font-[600]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Jewelry
          </h2>
          <p className="mt-2 md:mt-4 text-[10px] md:text-[25px] font-[200] w-[300px] md:w-[400px]">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      {/* Black Frieday */}
      <div className="flex items-center justify-center mt-10">
        <div className="w-[1000px] h-[152px] bg-[#1E1E1E] text-white text-center ">
          <p className="font-jakarta md:text-[30px] text-[20px] font-[600] mt-5 ">
            BLACK FRIDAY SALE | UP TO 40% OFF
          </p>
          <p className="font-[Inter] md:text-[25px] text-[15px] font-[200]">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <Link
            to={"#"}
            className="underline md:text-[16px] text-[12px] font-[400] font-jakarta mt-5"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="w-full overflow-x-auto p-4 h-fit sticky top-[5rem] md:top-14 z-40 bg-white flex items-center justify-center">
        <div className="flex gap-3 md:gap-6 overflow-x-auto">
          {categories?.map((category, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              {/* Category Link Wrap */}
              <span
                className="block"
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                {/* Category Name */}
                <h3 className="text-xs sm:text-sm md:text-lg font-[Inter] font-light mb-1">
                  {category.name}
                </h3>

                {/* Images */}
                <div className="flex gap-2 sm:gap-4">
                  {(Array.isArray(category.image)
                    ? category.image
                    : [category.image]
                  )?.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`${API_URL}/${image}`}
                      alt={category.name}
                      className="cursor-pointer w-[60px] sm:w-[80px] md:w-[120px] lg:w-[160px] h-auto rounded-full"
                    />
                  ))}
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mr-25 font-[Inter] text-[#292D32] font-[300]">
        <p>{products.length}Results</p>
      </div>

      {/* Options */}
      {/* <div className="container p-6 "> */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-10 justify-around md:ml-[60px]">
          {/* ✅ Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b">
            <button
              className="flex items-center space-x-2 text-lg font-semibold"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <CiFilter className="text-xl" />
              <span>Filters</span>
            </button>
          </div>

          {/* ✅ Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 overflow-auto p-6">
              <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <IoClose className="text-2xl" />
                </button>
              </div>

              {attributeOptions?.map((filterCategory, index) => (
                <div key={index} className="mb-6 border-b">
                  <button
                    className="flex justify-between items-center w-full text-lg font-weight:450 py-3"
                    onClick={() => toggleFilter(filterCategory.title)}
                  >
                    {filterCategory.title}
                    <span>
                      {openFilters[filterCategory.title] ? (
                        <MdKeyboardArrowUp size={22} />
                      ) : (
                        <MdKeyboardArrowDown size={22} />
                      )}
                    </span>
                  </button>

                  <div
                    className={`${
                      openFilters[filterCategory.title] ? "block" : "hidden"
                    }`}
                  >
                    {filterCategory?.options?.map((option) => (
                      <label
                        key={option.id}
                        value={option.id}
                        className="flex items-center space-x-2 cursor-pointer mb-2"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-black border rounded appearance-none checked:bg-black"
                          onChange={() =>
                            handleFilterChange(filterCategory.field, option.id)
                          }
                        />
                        <span className="text-gray-700">{option.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block col-span-1 p-4 w-70 h-screen overflow-y-auto sticky top-75">
            <h2 className="text-[20px] font-[Inter] font-[600]">Filter</h2>

            {attributeOptions?.map((filterCategory, index) => (
              <div key={index} className="mb-6 border-b border-gray-300">
                <button
                  className="flex justify-between items-center w-full text-[15px] font-weight:450 mb-2 mt-6 "
                  onClick={() => toggleFilter(filterCategory.title)}
                >
                  {filterCategory.title}
                  <span>
                    {openFilters[filterCategory.title] ? (
                      <MdKeyboardArrowUp size={22} />
                    ) : (
                      <MdKeyboardArrowDown size={22} />
                    )}
                  </span>
                </button>

                <div
                  className={`${
                    openFilters[filterCategory.title] ? "block" : "hidden"
                  }`}
                >
                  {filterCategory?.options?.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-2 cursor-pointer mb-2"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-black border rounded appearance-none checked:bg-black"
                        onChange={() =>
                          handleFilterChange(filterCategory.field, option.id)
                        }
                        checked={
                          filters[filterCategory.field]?.includes(option.id) ||
                          false
                        }
                      />
                      <span className="text-gray-700">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
              {products?.length > 0 ? (
                products?.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>

            {/* Centered More Button */}
            <div className="flex items-center justify-center mt-5 font-[Plus Jakarta Sans]">
              <button className="w-[135px] h-[50px] border-2">More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Collage Image */}
      <div className="flex flex-col md:flex-row justify-around">
        <div className="gap-6 items-center mt-5">
          {/* Left Text */}
          <div className="md:col-span-1">
            <h2
              className="text-3xl  font-semibold leading-tight md:text-[50px] ml-10 leading-tight"
              style={{ fontFamily: "Noto Serif JP" }}
            >
              For every <br className="hidden md:block" /> passion in{" "}
              <br className="hidden md:block" /> your repertoire
            </h2>
          </div>
        </div>

        {/* Right Grid */}
        <div className="py-10 flex justify-around">
          <div className="flex justify-center gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div className="relative md:w-[262px] w-[100px] md:h-[350px] overflow-hidden group">
                <img
                  src={Woman1}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>

              <div className="relative md:w-[263px] w-[100px] md:h-[241px]  overflow-hidden group">
                <img
                  src={Rings}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="relative md:w-[263px] w-[100px] md:h-[241px] overflow-hidden group">
                <img
                  src={Rings}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>
              <div className="relative md:w-[262px] w-[100px] md:h-[350px] overflow-hidden group">
                <img
                  src={Woman1}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <div className="relative md:w-[262px] w-[100px] md:h-[350px] overflow-hidden group">
                <img
                  src={Woman1}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>

              <div className="relative md:w-[263px] w-[100px] md:h-[241px] overflow-hidden group">
                <img
                  src={Rings}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  transition-opacity duration-300"></div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white  text-black font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default Category;
