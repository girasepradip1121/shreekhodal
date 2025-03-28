import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, userToken } from "../Component/Variable";

const Products = () => {
  const userData = userToken();
  const token = userData?.token;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const attributeOptions = [
    {
      title: "Base Metal",
      field: "baseMetal", // ✅ Match with database column
      options: [
        { id: 1, name: "Brass" },
        { id: 2, name: "Oxidised Silver" },
        { id: 3, name: "Stone" },
        { id: 4, name: "Merable" },
      ],
    },
    {
      title: "Polish",
      field: "Polish", // ✅ Match with database column
      options: [
        { id: 1, name: "Gold Polish" },
        { id: 2, name: "Silver Polish" },
        { id: 3, name: "Rose Gold Polish" },
      ],
    },
    {
      title: "Occasion",
      field: "Occasion", // ✅ Match with database column
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
      field: "Trend", // ✅ Match with database column
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
      field: "Collection", // ✅ Match with database column
      options: [
        { id: 1, name: "Ethnic" },
        { id: 2, name: "Contemporary" },
        { id: 3, name: "Oxidised" },
      ],
    },
    {
      title: "Ideals for",
      field: "IdealsFor", // ✅ Match with database column
      options: [
        { id: 1, name: "Girls" },
        { id: 2, name: "Women" },
      ],
    },
    {
      title: "Color",
      field: "color", // ✅ Match with database column
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
      field: "NecklaceType", // ✅ Match with database column
      options: [
        { id: 1, name: "Choker" },
        { id: 2, name: "Bridal" },
      ],
    },
    {
      title: "Warranty",
      field: "Warranty", // ✅ Match with database column
      options: [
        { id: 1, name: "6 Months" },
        { id: 2, name: "1 Year" },
      ],
    },
    {
      title: "Weight",
      field: "Weight", // ✅ Match with database column
      options: [
        { id: 1, name: "30g" },
        { id: 2, name: "40g" },
        { id: 3, name: "50g" },
      ],
    },
  ];

  const [form, setForm] = useState({
    images: [],
    name: "",
    discount: "",
    price: "",
    originalPrice: "",
    gender: "",
    description: "",
    stock: "",
    categoryId: "",
    material: [],
    deliverytime: "",
    deliverycharge: "",
    baseMetal: 0,
    Polish: 0,
    Occasion: 0,
    Trend: 0,
    Collection: 0,
    NecklaceClasType: 0,
    IdealsFor: 0,
    color: "",
    NecklaceType: 0,
    Warranty: 0,
    Weight: 0,
  });

  const handleDropdownChange = (e) => {
    const { name, value } = e.target; // `value` ab ID hai, name attribute wahi hai
    setForm((prevForm) => ({
      ...prevForm,
      [name]: Number(value), // Ensure value is stored as a number
    }));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category/getall`);
      setCategories(response.data);
      console.log("categories", response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const materialsList = [
    { id: 1, name: "Gold" },
    { id: 2, name: "Silver" },
    { id: 3, name: "Platinum" },
    { id: 4, name: "Wooden" },
  ];

  const handleSelectMaterial = (material) => {
    setForm((prevForm) => ({
      ...prevForm,
      material: [...prevForm.material, material.id], // ✅ ID store karna
    }));
  };

  const handleRemoveMaterial = (id) => {
    setForm((prevForm) => ({
      ...prevForm,
      material: prevForm.material.filter((matId) => matId !== id), // ✅ Remove selected ID
    }));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/getall`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  const handleEdit = (product) => {
    setForm({
      ...product,
      images: Array.isArray(product.images)
        ? product.images
        : JSON.parse(product.images || "[]"),
      material: Array.isArray(product.material)
        ? product.material
        : JSON.parse(product.material || "[]"),
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (orderId) => {
    setDeleteOrderId(orderId);
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_URL}/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product Deleted...");
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      toast.error("Error Deleting Product...");
      console.error("Failed to delete product", error);
    }
  };

  const handleAddProduct = () => {
    setForm({
      images: [],
      name: "",
      discount: "",
      price: "",
      originalPrice: "",
      gender: "",
      description: "",
      stock: "",
      categoryId: "",
      material: [],
      deliverytime: "",
      deliverycharge: "",
      baseMetal: 0,
      Polish: 0,
      Occasion: 0,
      Trend: 0,
      Collection: 0,
      NecklaceClasType: 0,
      IdealsFor: 0,
      color: "",
      NecklaceType: 0,
      Warranty: 0,
      Weight: 0,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, categoryId: e.target.value }); // ✅ `categoryId` set ho raha hai
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Ensure form.images is always an array
    const existingImages = Array.isArray(form.images) ? form.images : [];

    if (files.length + existingImages.length <= 4) {
      setForm({ ...form, images: [...existingImages, ...files] });
    } else {
      toast.error("You can upload a maximum of 4 images.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        if (Array.isArray(form[key])) {
          form[key].forEach((image) => {
            formData.append("images", image);
          });
        } else if (typeof form[key] === "string") {
          try {
            const existingImages = JSON.parse(form[key]); // Safely parse existing images
            if (Array.isArray(existingImages)) {
              existingImages.forEach((img) => {
                formData.append("images", img);
              });
            } else {
              formData.append("images", existingImages);
            }
          } catch (error) {
            console.error("Invalid JSON in images:", form[key]);
            formData.append("images", form[key]); // Fallback in case of invalid JSON
          }
        }
      } else {
        formData.append(key, form[key]);
      }
    });

    // Check FormData content before sending it
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `${API_URL}/product/update/${form.productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(`${API_URL}/product/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response", response.data);
      }

      fetchProducts();
      setIsModalOpen(false);
      toast.success("Product Saved Successfully");
    } catch (error) {
      toast.error("Error saving product...");
      console.error("Failed to save product", error);
    }
  };

  const handleRemoveImage = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <ToastContainer />
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-md w-full text-black">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
              Are you sure?
            </h2>
            <p className="mb-4 text-center">
              You Want To Delete This Product Permanently.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-6 bg-gray-900 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            Products
          </h2>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <PlusCircle size={20} /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-2 hover:shadow-xl transition-all"
            >
              <img
                src={
                  product?.images && product?.images.length > 0
                    ? `${API_URL}/${JSON.parse(product.images)[0]}`
                    : "default-image-path.jpg"
                }
                alt={product.name}
                className="w-full h-32 sm:h-40 object-cover rounded-xl"
              />

              <h3 className="text-lg text-black font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {product.description.length > 20
                  ? `${product.description.slice(0, 20)}...`
                  : product.description}
              </p>

              <p className="text-blue-500 font-bold">₹{product.price}</p>

              <div className="flex gap-4 mt-2 justify-center sm:justify-start">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-md"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => openDeleteModal(product.productId)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-0 z-50">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-white text-center">
                {isEditing ? "Edit Product" : "Add Product"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount Label"
                  value={form.discount}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="Original Price"
                  value={form.originalPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleCategoryChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="deliverytime"
                  placeholder="Delivery Time(Days)"
                  value={form.deliverytime}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  name="deliverycharge"
                  placeholder="Delivery Charge"
                  value={form.deliverycharge}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                ></textarea>

                <div className="flex gap-2">
                  <select
                    onChange={(e) => {
                      const material = materialsList.find(
                        (m) => m.id === Number(e.target.value)
                      );
                      if (material) handleSelectMaterial(material);
                    }}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  >
                    <option value="">Select Material</option>
                    {materialsList?.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2">
                  {selectedMaterials?.map((material) => (
                    <div
                      key={material.id}
                      className="flex justify-between bg-gray-700 p-2 rounded mt-1"
                    >
                      <span>{material.name}</span>
                      <button
                        onClick={() => handleRemoveMaterial(material.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Hidden input for database storage */}
                <input
                  type="hidden"
                  name="material"
                  value={selectedMaterials?.map((m) => m.id).join(",")}
                />

                {attributeOptions?.map((attr, index) => (
                  <div key={index}>
                    <label className="text-white">{attr.title}</label>
                    <select
                      name={attr.field} //Corrected field name (Backend ke column se match)
                      value={form[attr.field]} //Backend ke column name ke hisaab se set karna
                      onChange={(e) => handleDropdownChange(e)} //ID pass karenge
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select {attr.title}</option>
                      {attr?.options?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* File Input */}
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                {/* Show Existing Images */}
                {Array.isArray(form.images) && form.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {form.images?.map((img, index) => (
                      <div key={index} className="relative w-16 h-16">
                        <img
                          src={
                            typeof img === "string"
                              ? `${API_URL}/${img}`
                              : URL.createObjectURL(img)
                          }
                          alt={`Uploaded ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                          onClick={() => handleRemoveImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 rounded text-white w-full"
                  >
                    {isEditing ? "Update" : "Add"}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 px-4 py-2 rounded text-white w-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
