import React, { useState } from "react";
import Image1 from "../Images/Contact/image 1.png";
import Image2 from "../Images/Contact/image 2.png";
import axios from "axios";
import { API_URL } from "../Component/Variable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await axios.post(`${API_URL}/request/create`, formData);
      setResponseMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", phone: "" });
      toast.success("Request Send Successfully")
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Failed to send message."
      );
      toast.error("Failed To Send Request")
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      id: 1,
      title: "Mobile Number",
      icon: <i className="fa-solid fa-phone"></i>,
      text: "+971 558832713",
    },
    {
      id: 2,
      title: "Email",
      icon: <i className="fa-solid fa-envelope"></i>,
      text: "bhavinpatel971892 @gmail.com",
    },
    {
      id: 3,
      title: "Address",
      icon: <i className="fa-solid fa-location-dot"></i>,
      text: "Shop No. 403, City Gold Plaza, Pedak Road, Near Patel Vadi, Rajkot, Gujarat, India.",
    },
    {
      id: 4,
      title: "Working Hours",
      icon: <i className="fa-solid fa-clock"></i>,
      text: "Mon - Sat 09:00 TO 18:00",
    },
  ];
  return (
    <>
    <ToastContainer/>
      {/* Front View */}
      <div className="bg-white ml-[5%] mr-[5%] md:mt-25 mt-30 mb-10">
        {/* First Section */}
        <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-30 py-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={Image1}
              alt="Gold Rings"
              className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[510px] md:h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-10 mt-6 md:mt-0">
            <p className="text-gray-700 text-justify text-sm sm:text-base md:text-lg leading-relaxed font-jakarta">
              Lorem ipsum dolor sit amet consectetur. Dolor et volutpat in non.
              Luctus sit libero urna viverra sed non dui elementum quam. Enim
              ipsum amet sed ultrices amet adipiscing. Eget a molestie
              parturient erat fringilla.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-45 py-6">
          <div className="w-full md:w-1/2 px-4 md:px-10 mt-6 md:mt-0 text-center md:text-left">
            <p
              style={{ fontFamily: "'Noto Serif JP', serif" }}
              className="text-[30px] sm:text-[40px] md:text-[60px] leading-tight sm:leading-[50px] md:leading-[105px] font-semibold"
            >
              Jewelry tells eternal stories{" "}
            </p>
            <p
              style={{ fontFamily: "'Noto Serif JP', serif" }}
              className="text-[16px] sm:text-[20px] md:text-[25px] text-right md:text-right mr-20 mt-2"
            >
              Silver
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={Image2}
              alt="Silver Ring"
              className="w-[250px] sm:w-[350px] md:w-[606px] object-cover"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col md:flex-row justify-center gap-5 p-5 ">
          {contactInfo?.map((item) => (
            <div
              key={item.id}
              className="md:w-[400px] h-[130px] font-[Inter] border border-gray-300 p-2 rounded-[20px]"
            >
              <div>
                <p>{item.title}</p>
              </div>

              <div className="flex items-center space-x-3 mt-2">
                <div className="bg-black text-white font-[Inter] font-[600] text-[16px] rounded-full p-3 w-[45px] aspect-square flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <p className="text-[#7D7D7D] text-[15px] font-[Inter] font-[600]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Map and Fields */}
        <div className="flex flex-col md:flex-row gap-8 p-4 bg-white rounded-xl ">
          {/* Google Map Section */}
          <div className="w-full md:w-1/2">
            <iframe
              title="Google Map - Mota Varachha, Surat"
              className="md:h-[457px] h-[320px] md:w-full w-[300px] rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14604.378582143552!2d72.8510098!3d21.2100926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0537cf29d5d7b%3A0x47b6b2f97f8c80e2!2sMota%20Varachha%2C%20Surat%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1644525547827!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className="w-full md:w-1/2 p-6 bg-white rounded-xl shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
             
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="w-full p-3 border border-gray-300 rounded-md  outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="w-full p-3 border border-gray-300 rounded-md  outline-none"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone *"
                className="w-full p-3 border border-gray-300 rounded-md  outline-none"
              />
            </div>

            {/* Message Input */}
            <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
              placeholder="Your Message"
              className="w-full h-32 mt-4 p-3 border border-gray-300 rounded-md  outline-none resize-none"
            ></textarea>

            {/* Send Message Button */}
            <button
            type="submit"
            className="mt-4 px-10 py-3 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
