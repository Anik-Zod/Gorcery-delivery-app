import React from "react";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../features/productSlice";
import { motion } from "framer-motion";

function CheckBox() {
  const categoryList = ["Vegetables", "Fruits", "Dairy", "Instant", "Drinks"];
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.products.filters);

  const handleCategoryToggle = (category) => {
    dispatch(toggleCategory(category.toLowerCase()));
  };

  return (
    <div className="flex flex-col gap-1">
      {categoryList.map((cat) => {
        const isSelected = categories.includes(cat.toLowerCase());

        return (
          <motion.label
            key={cat}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center justify-between p-1 rounded-xl cursor-pointer transition-all duration-200 border ${isSelected
                ? "bg-primary/5 border-primary/20 shadow-sm"
                : "bg-transparent border-transparent hover:bg-gray-50"
              }`}
          >
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleCategoryToggle(cat)}
              className="hidden"
            />

            <div className="flex items-center gap-3 z-10">
              {/* Custom Indicator */}
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 ${isSelected
                    ? "bg-primary shadow-md shadow-primary/30"
                    : "bg-gray-200 group-hover:bg-gray-300"
                  }`}
              >
                <motion.div
                  initial={false}
                  animate={{ scale: isSelected ? 1 : 0 }}
                >
                  <Check size={12} strokeWidth={3} className="text-white" />
                </motion.div>
              </div>

              {/* Label Text */}
              <span
                className={`font-medium text-[15px] transition-colors ${isSelected ? "text-primary" : "text-gray-600 group-hover:text-gray-900"
                  }`}
              >
                {cat}
              </span>
            </div>
          </motion.label>
        );
      })}
    </div>
  );
}

export default CheckBox;
