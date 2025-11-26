import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";

export default function OffersCard({ service, from, discount, image }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group lg:w-82 h-72 bg-white/70 backdrop-blur-xl rounded-3xl shadow-md 
        hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between 
        border border-white/40 cursor-pointer"
    >
      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-gray-800 
          group-hover:text-primary transition"
        >
          {service}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="uppercase text-gray-500 text-sm mt-1"
        >
          {from}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="uppercase bg-primary/10 text-primary text-xs font-semibold 
            rounded-full px-3 py-1 mt-3 inline-block"
        >
          {discount}
        </motion.p>
      </motion.div>

      {/* IMAGE + BUTTON */}
      <motion.div
        className="relative flex justify-center items-center mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={image}
          alt="Food"
          className="h-36 object-contain"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
        />

        <motion.div
          onClick={() => navigate("/products")}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
          whileHover={{ scale: 1.15 }}
          className="absolute left-0 w-11 h-11 bg-primary text-white rounded-full 
            flex items-center justify-center shadow-lg transition"
        >
          <motion.div
            animate={{ x: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <LogOut size={18} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
