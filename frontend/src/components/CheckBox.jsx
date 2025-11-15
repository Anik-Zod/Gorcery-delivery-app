import React from "react";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleCategory } from "../features/productSlice";

function CheckBox() {
  const categoryList = ["Vegetables", "Fruits", "Dairy", "Instant", "Drinks"];
  const dispatch = useDispatch();

  const { categories } = useSelector(
    (state) => state.products.filters
  );

  const handleCategoryToggle = (category) => {
    dispatch(toggleCategory(category.toLowerCase()));
  };
  console.log(categories)

  return (
    <>
      {categoryList.map((cat) => (
        <label key={cat} className="flex items-center space-x-3 cursor-pointer select-none">
          {/* Hidden native checkbox for accessibility */}
          <input
            type="checkbox"
            checked={categories.includes(cat.toLowerCase())}
            onChange={()=>handleCategoryToggle(cat)}
            className="hidden"
          />

          {/* Custom checkbox */}
          <div
            className={`h-5 w-5 flex items-center justify-center border-2 rounded transition-colors duration-200 ${
              categories.includes(cat.toLowerCase()) ? "bg-primary border-primary" : "border-gray-300"
            }`}
          >
            {categories.includes(cat.toLowerCase()) && <Check size={14} color="white" />}
          </div>

          {/* Label */}
          <span className="text-gray-700 font-medium">{cat}</span>
        </label>
      ))}
    </>
  );
}

export default CheckBox;
