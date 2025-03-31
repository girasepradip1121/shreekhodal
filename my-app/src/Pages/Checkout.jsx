import { useState } from "react";
import { FaRegAddressCard, FaCreditCard } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, userToken } from "../Component/Variable";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Form } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();

  // const [errors, setErrors] = useState({});

  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const location = useLocation();
  const { cartItems, subtotal } = location.state || {
    cartItems: [],
    subTotal: 0,
  };
  const userData = userToken();
  const userId = userData?.userId;
  const token=userData?.token;

  // Calculate totals
  const shippingCharges = subtotal >= 500 ? 0 : 50;
  const taxAmount = subtotal * 0.18;
  const grandTotal = subtotal + shippingCharges + taxAmount;

  const handleConfirmOrder = async (data) => {
    console.log(data);
    try {
      const orderData = {
        ...data,
        userId,
        shippingCharge: shippingCharges,
        tax: taxAmount,
        totalPrice: grandTotal,
        paymentMethod: paymentMethod,
        orderItems: cartItems?.map((item) => ({
          productId: item.productId,
          price: item.product.price,
          quantity: item.quantity,
          totalAmount: item.product.price * item.quantity,
        })),
      };
      console.log("cartitems", cartItems);
      const response = await axios.post(`${API_URL}/order/create`, orderData, {
        headers: { Authorization: `Bearer ${token}` },  // ✅ Bracket fix
      });
      
      if (response.status === 201) {
        toast.success("Order placed successfully");
        navigate("/ordersuccess");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };
  console.log(getValues());

  return (
    <>
      <ToastContainer />
      <div className="max-w-6xl  mx-auto p-6 flex flex-col-reverse md:flex-row gap-8 md:mt-25 mt-30 mb-10">
        {/* Left Section */}
        <Form onSubmit={handleSubmit(handleConfirmOrder)}>
          <div className="md:col-span-2 space-y-6 md:w-[800px]">
            {/* Contact Info */}
            <div className="border border-gray-600 p-6 rounded-lg ">
              <h3 className="flex items-center gap-2 text-lg font-semibold font-[Inter]">
                <FaRegAddressCard /> CONTACT INFO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Phone Number is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Phone Number is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Phone Number"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.phone && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.phone?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email address is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Email address is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Email address"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2 font-[Inter]">
                <i className="fa-solid fa-truck"></i> SHIPPING ADDRESS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: "First Name is required.",
                    validate: (value) =>
                      value?.trim() ? true : "First Name is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="First Name"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.firstName && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.firstName?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="lastName"
                  rules={{
                    required: "Last name is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Last name is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Last name"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.lastName && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.lastName?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="address1"
                  rules={{
                    required: "Address line 1 is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Address line 1 is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Address line 1"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.address1 && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.address1?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="apt"
                  rules={{
                    required: "Apt, Suite is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Apt, Suite is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Apt, Suite"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.apt && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.apt?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="address2"
                  rules={{
                    required: "Address line 2 is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Address line 2 is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Address line 2"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.address2 && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.address2?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="city"
                  rules={{
                    required: "City is required.",
                    validate: (value) =>
                      value?.trim() ? true : "City is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="City"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.city && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.city?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="country"
                  rules={{
                    required: "Country is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Country is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Country"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.country && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.country?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="state"
                  rules={{
                    required: "State/Province is required.",
                    validate: (value) =>
                      value?.trim() ? true : "State/Province is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="State/Province"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.state && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.state?.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="postalCode"
                  rules={{
                    required: "Postal code is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Postal code is required.",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Postal code"
                      className="border p-2 rounded-md w-full font-[Inter] border-gray-300"
                    />
                  )}
                />
                {errors?.postalCode && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {" "}
                    {errors?.postalCode?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold font-[Inter]">
                <FaCreditCard /> PAYMENT
              </h3>
              <div className="mt-4 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-[Inter]">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-black"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-[Inter]">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="accent-black"
                  />
                  Online / Netbanking
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold font-[Inter]">
              Order summary
            </h3>
            <div className="mt-4 space-y-4">
              {/* Product Items */}
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={`${API_URL}/${JSON.parse(item.product.images)[0]}`}
                    alt={item.name}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-[400] text-[14px]">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">QTY:{item.quantity}</p>
                  </div>

                  {/* Quantity */}

                  {/* <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, "decrease")} className="border pl-0.5 border-gray-200 rounded-full text-[12px] w-[18px] h-[18px] cursor-pointer">
                  <FaMinus />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, "increase")} className=" border pl-0.5 border-gray-200 rounded-full text-[12px] w-[18px] h-[18px] cursor-pointer">
                  <FaPlus />
                </button>
              </div> */}
                  <p className="font-semibold text-[14px] font-[Inter]">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Price Details */}
              <div className="space-y-2 text-sm font-[Inter]">
                <div className="flex justify-between">
                  <span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping estimate</span>{" "}
                  <span>₹{shippingCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax estimate</span> <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Order total</span> <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-900 transition font-[Inter]"
                // onClick={handleConfirmOrder}
                type="submit"
              >
                Confirm order
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
