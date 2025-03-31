import React from 'react'
import FImg from "../Images/FImg.png"
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
        <div className='bg-[#F3F1ED]'><br /><br />
            <div className=" flex flex-col md:flex-row items-center justify-center md:h-[400px] w-full max-w-[943px] mx-auto p-6">
                <div className="w-full md:w-[50%]">
                    <img src={FImg} alt="Stay in Touch" className="w-full h-auto md:h-[400px] object-cover" />
                </div>

                <div className="w-full md:w-[50%] flex flex-col items-center text-center md:text-left px-6 h-[200px] md:h-[400px] bg-white">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4 md:mt-30 mt-5">STAY IN TOUCH</h2>
                    <p className="text-gray-700 mb-4 text-center">Subscribe to get special offers, free giveaways, and once-in-Link-lifetime deals.</p>
                      <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
                        Subscribe
                      </button>
                </div>
            </div> 
            {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-around mt-5">
        {/* Product Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">Product</h3>
          <ul className="text-gray-600 space-y-1 text-center">
            <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="#" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">Resources</h3>
          <ul className="text-gray-600 space-y-1 text-center">
            <li><Link to="#" className="hover:underline">Documentation</Link></li>
            <li><Link to="#" className="hover:underline">Case Studies</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">Company</h3>
          <ul className="text-gray-600 space-y-1 text-center">
            <li><Link to="/contact" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Social Icons */}
      <div className="flex flex-col md:flex-row p-4 justify-between items-center mt-8 border-t pt-4 text-gray-600 text-sm">
        <p>© Blue Diamond Jewelry™ 2021</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebook className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaInstagram className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaPinterest className="text-xl hover:text-gray-800 cursor-pointer" />
          {/* <FaDiamond className="text-xl hover:text-gray-800 cursor-pointer" /> */}
        </div>
      </div>
      <br />
        </div>
    </>
  )
}

export default Footer
