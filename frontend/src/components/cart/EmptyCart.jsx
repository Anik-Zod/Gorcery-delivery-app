// EmptyCart.jsx
import React from "react";
import { motion } from "framer-motion"; // use framer-motion
import EmptyCartImage from "../../../public/Empty-Cart.png"; // replace with your PNG path
import { ShoppingBag, ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
        animate={{ rotate: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute rotate-50 rounded-full size-60 right-4 top-20">
            <ShoppingCart size={40} color="green"/>
        </motion.div>

        {/* Floating Image */}
        <motion.img
          src={EmptyCartImage}
          alt="Empty Cart"
          className="w-64 h-64 mx-auto mb-6"
          initial={{ y: -20, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          whileHover={{ scale: 1.1, y: -10, rotate: 5 }}
          transition={{
            y: { duration: 1.5, yoyo: Infinity, ease: "easeInOut" },
            rotate: { duration: 2, yoyo: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Animated Icon + Heading */}
        <motion.div
          className="flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-700 mb-3"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="mr-2 text-blue-500"
            animate={{ y: [0, -5, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ShoppingCart size={28} />
          </motion.div>
          Your cart is empty
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Browse our products and add items to your cart to get started.
        </motion.p>

        {/* Shop Now Button */}
        <motion.button
          onClick={() => window.location.href = "/products"}
          className="px-8 py-3 bg-primary w-full text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0px 15px 25px rgba(0, 118, 255, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Shop Now
        </motion.button>

        {/* Decorative Glow */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default EmptyCart;
