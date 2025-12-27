import React from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../features/productSlice";
import { motion, AnimatePresence } from "framer-motion";

// Define price ranges
const priceRanges = [
  { label: "Under $100", value: "under-100", min: 0, max: 100 },
  { label: "$100 - $200", value: "100-200", min: 100, max: 200 },
  { label: "$200 - $300", value: "200-300", min: 200, max: 300 },
  { label: "$300 - $500", value: "300-500", min: 300, max: 500 },
  { label: "Over $500", value: "over-500", min: 500, max: Infinity },
];

export default function PriceRange() {
  const dispatch = useDispatch();
  const { priceRange } = useSelector((state) => state.products.filters);

  // Determine which range is currently selected
  const selectedValue = priceRanges.find(
    (r) => r.min === priceRange.min && r.max === priceRange.max
  )?.value;

  const handleSelect = (range) => {
    if (selectedValue === range.value) {
      // Unselect → reset to "All"
      dispatch(setPriceRange({ min: 0, max: Infinity }));
    } else {
      dispatch(setPriceRange({ min: range.min, max: range.max }));
    }
  };

  const hasSelection = priceRange.min !== 0 || priceRange.max !== Infinity;

  return (
    <div className="flex flex-col gap-1.5">
      {priceRanges.map((range) => {
        const isSelected = selectedValue === range.value;

        return (
          <motion.label
            key={range.value}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`group flex items-center justify-between p-1 rounded-xl cursor-transition-all duration-200 border cursor-pointer ${isSelected
                ? "bg-primary/5 border-primary/20 shadow-sm"
                : "bg-transparent border-transparent hover:bg-gray-50"
              }`}
          >
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelect(range)}
              className="hidden"
            />

            <div className="flex items-center gap-3 w-full">
              {/* Custom Indicator (Square Checkbox Style) */}
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

              <span
                className={`flex-1 text-[15px] font-medium transition-colors ${isSelected ? "text-primary" : "text-gray-600 group-hover:text-gray-900"
                  }`}
              >
                {range.label}
              </span>
            </div>
          </motion.label>
        );
      })}

      {/* Clear Button */}
      <AnimatePresence>
        {hasSelection && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide hover:bg-red-50 hover:text-red-500 transition-all group"
            onClick={() => dispatch(setPriceRange({ min: 0, max: Infinity }))}
          >
            <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
            Reset Filter
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
