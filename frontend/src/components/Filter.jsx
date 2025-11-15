import React from "react";
import { SlidersHorizontal } from "lucide-react";
import CheckBox from "./CheckBox";
import PriceRange from "./PriceRange";
import { useSelector, useDispatch } from "react-redux";
import { setPriceRange, toggleCategory } from "../features/productSlice";


export default function Filter() {
    const {  priceRange } = useSelector(
      (state) => state.products.filters
    );
  

  return (
    <aside className="w-[260px] rounded-xl border border-gray-200 bg-white shadow-sm hidden lg:block overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-100">
        <SlidersHorizontal className="text-primary w-5 h-5" />
        <span className="font-semibold text-gray-700 tracking-wide text-lg">
          Filter
        </span>
      </div>

      {/* Categories */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-3">
          Categories
        </p>
        <div className="flex flex-col gap-2">
            <CheckBox/>

        </div>
      </div>

      {/* Price Range */}
      <div className="px-5 py-5">
        <p className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-3 flex items-center justify-between">
          <span>Price Range</span>
          <span className="ml-3 text-sm rounded-lg bg-primary/10 px-3 py-1 text-primary font-medium">
            {priceRange.min === 0 && priceRange.max === Infinity
              ? "All"
              : `$${priceRange.min} - ${
                  priceRange.max === Infinity ? "∞" : priceRange.max
                }`}
          </span>
        </p>

        <PriceRange />
      </div>
    </aside>
  );
}
