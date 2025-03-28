import React from "react";
import Slider from "../Component/Slider";
import Earring from "../Images/Items/Item 1.png";
import Necklaces from "../Images/Items/Item 2.png";
import Bracelets from "../Images/Items/Item 3.png";
import AllRings from "../Images/Items/Item 4.png";
import EngagementRings from "../Images/Items/Item 5.png";
import Hand from "../Images/HandCraft.png";
import Latest1 from "../Images/Latest/Item 1.png";
import Latest2 from "../Images/Latest/Item 2.png";
import Latest3 from "../Images/Latest/Item 3.png";
import Service1 from "../Images/Services/Item 1.png";
import Service2 from "../Images/Services/Item 2.png";
import Service3 from "../Images/Services/Item 3.png";
import { FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const items = [
    { id: 1, name: "Earrings", image: Earring },
    { id: 2, name: "Necklaces", image: Necklaces },
    { id: 3, name: "Bracelets", image: Bracelets },
    { id: 3, name: "All Rings", image: AllRings },
    { id: 3, name: "Engagement Rings", image: EngagementRings },
  ];
  const Latest = [
    { id: 1, name: "Item-1", img: Latest1 },
    { id: 2, name: "Item-2", img: Latest2 },
    { id: 3, name: "Item-3", img: Latest3 },
  ];

  const reviews = [
    {
      id: 1,
      text: "Great variety of cuts and amazing customer service. Helped to find the perfect ring and helped me to personalize it a little more.",
      name: "Nico Jones",
    },
    {
      id: 2,
      text: "What an amazing shopping experience! I tried other jewelers and didn’t find anything I liked. Thank you so much.",
      name: "Tracy Willis",
    },
    {
      id: 3,
      text: "Great quality, and showed they can work through a problem and maintain excellent customer service!!",
      name: "Susana Santos",
    },
  ];

  const Services = [
    { id: 1, name: "JEWELRY REPAIR", img: Service1 },
    { id: 2, name: "RING SIZING", img: Service2 },
    { id: 3, name: "JEWELRY POLISHING", img: Service3 },
  ];
  const navigate = useNavigate();
  return (
    <>
      {/* <Header/> */}
      <Slider />
      {/* Shop By Jewelry Type */}
      <div className=" ml-[5%] mr-[5%]">
        <p className="md:text-[36px] text-[25px] font-[500] text-[#002D69] font-[Lato] md:text-left md:ml-7 text-center">
          SHOP BY JEWELRY TYPE
        </p>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-2 justify-center">
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center font-[Lato] text-[#002D69]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md mx-auto"
                />
                <h3 className="mt-2 text-[18px] font-[500] ">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hand Crafted */}
      <div className="w-full flex md:flex-row flex-col text-center items-center text-justify">
        <div className="md:w-[50%] w-full h-[300px]  md:h-[682px] bg-[#002D69]  text-white md:p-[100px] p-[50px]">
          <h1 className="md:text-[54px] text-[25px] font-[900] font-[Lato] ">
            Hand Crafted fine pieces.
          </h1>
          <br />
          <p className="md:text-[28px] text-[12px] font-[700] font-[Lato]">
            We also firmly believed that our customers deserved more choices,
            straightforward information and legendary service.
          </p>
          <br />
          <button
            className="w-[170px] md:h-[42px] h-[30px] bg-white text-[#002D69] rounded-[4px]"
            onClick={() => navigate("/category")}
          >
            Learn More
          </button>
        </div>
        <div className="md:w-[50%] w-full  md:h-[682px]">
          <img src={Hand} alt="" className="md:h-[682px] h-[300px]" />
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Our Latest Jewelry */}
      <div className="ml-[5%] mr-[5%]">
        <h1 className="text-[#002D69] text-[36px] font-[Lato] font-[900] md:ml-8 text-center md:text-left">
          OUR LATEST JEWELRY
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 justify-center">
          {Latest?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center font-[Lato] text-[#002D69]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[392px] h-[392px] object-cover "
              />
              {/* <h3 className="mt-2 text-[18px] font-[500] ">{item.name}</h3> */}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button className="bg-[#002D69] text-white font-[Lato] p-3 w-[170px] rounded-md">
            VIEW GALLERY
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Cutomer Testimonial */}
      <div className="ml-[5%] mr-[5%]">
        <h2 className="text-[36px] font-[900] font-[Lato] text-[#002D69] md:ml-[20px] p-2 mb-6 text-center ">
          CUSTOMER REVIEWS
        </h2>

        {/* Flex container with centered items on mobile */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="border-2 border-gray-200 rounded-md p-6 text-center w-[300px] md:w-[392px] h-[270px] flex flex-col items-center justify-center"
            >
              <FaQuoteLeft className="text-3xl text-[#002D69] mb-3" />
              <p className="text-gray-700 italic font-sans">{review.text}</p>
              <p className="mt-4 font-semibold italic text-gray-800">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Our Services */}
      <div className="ml-[5%] mr-[5%]">
        <h1 className="text-[#002D69] text-[36px] font-[Lato] font-[900] ml-8">
          OUR SERVICES
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 justify-center">
          {Services?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center font-[Lato] text-[#002D69]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[392px] h-[392px] object-cover "
              />
              <h3 className="mt-2 text-[18px] font-[500] ">{item.name}</h3>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            className="bg-[#002D69] text-white font-[Lato] p-3 w-[170px] rounded-md"
            onClick={() => navigate("/category")}
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
