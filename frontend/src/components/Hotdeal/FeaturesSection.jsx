import { Clock, CloudLightning, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <CloudLightning />,
      color: "text-yellow-500",
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      title: "Lightning Deals",
      desc: "Flash sales with limited time offers",
    },
    {
      icon: <Star />,
      color: "text-purple-500",
      border: "border-purple-200",
      bg: "bg-purple-50",
      title: "Premium Quality",
      desc: "Top-rated products with best reviews",
    },
    {
      icon: <Heart />,
      color: "text-pink-500",
      border: "border-pink-200",
      bg: "bg-pink-50",
      title: "Customer Favorites",
      desc: "Most loved items by our customers",
    },
    {
      icon: <Clock />,
      color: "text-red-500",
      border: "border-red-200",
      bg: "bg-red-50",
      title: "Limited Time",
      desc: "Hurry! These deals won't last long",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -2, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  const iconFloat = {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {features.map((item, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ y: -6, scale: 1.03, boxShadow: "0px 10px 25px rgba(0,0,0,0.09)" }}
          className={`relative rounded-3xl border-2 ${item.border} shadow-sm ${item.bg} p-10 flex flex-col items-center text-center gap-4 overflow-hidden`}
        >
          {/* Icon with float + wiggle */}
          <motion.div
            className={`text-4xl ${item.color}`}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            animate={iconFloat.animate}
            whileHover={{ rotate: 5 }}
          >
            {item.icon}
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            viewport={{ once: false }}
          >
            {item.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-600 max-w-[250px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            viewport={{ once: false }}
          >
            {item.desc}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
