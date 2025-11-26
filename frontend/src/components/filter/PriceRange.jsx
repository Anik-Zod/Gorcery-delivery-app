import React from "react";
import { Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../features/productSlice";

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

  return (
    <div className="rounded-md">
      <div className="flex flex-col gap-1.5">
        {priceRanges.map((range) => (
          <label
            key={range.value}
            className="flex items-center gap-1 cursor-pointer select-none text-gray-600 hover:text-gray-800 transition-colors duration-150"
          >
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              checked={selectedValue === range.value}
              onChange={() => handleSelect(range)}
              className="hidden"
            />

            {/* Custom checkbox */}
            <div
              className={`h-5 w-5 flex items-center justify-center border-2 rounded transition-colors duration-200 ${
                selectedValue === range.value
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {selectedValue === range.value && <Check size={14} color="white" />}
            </div>

            {/* Label */}
            <span className="px-2 font-medium py-1 rounded hover:bg-primary/10 transition-colors duration-150">
              {range.label}
            </span>
          </label>
        ))}

        {/* Option to reset to All */}
        <button
          className="mt-2 text-sm flex justify-center items-center gap-2 text-primary hover:underline self-start"
          onClick={() => dispatch(setPriceRange({ min: 0, max: Infinity }))}
        >
          <X size={15}/> clear Prices
        </button>
      </div>
    </div>
  );
}
