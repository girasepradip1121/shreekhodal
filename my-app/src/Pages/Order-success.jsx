import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { userToken } from "../Component/Variable";

const OrderSuccess = () => {
  const userData=userToken()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-500 text-white px-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white text-gray-900 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-lg text-center"
      >
        {/* Success Icon with Animation */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-green-500 text-7xl sm:text-8xl mb-6"
        >
          <FaCheckCircle />
        </motion.div>
        
        {/* Success Message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
          Woohoo! Order Confirmed
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl font-medium">
          Hey <span className="text-blue-600 font-semibold">{userData?.name}</span>,
          your order has been placed successfully! We appreciate your trust in us.
        </p>
        
        {/* Confetti Animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-confetti opacity-30"></div>
        </motion.div>
        
        {/* Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 text-white text-lg sm:text-xl px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;