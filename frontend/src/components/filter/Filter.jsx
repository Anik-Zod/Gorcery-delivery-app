import React from "react";
import { SlidersHorizontal, Filter as FilterIcon } from "lucide-react";
import CheckBox from "./CheckBox";
import PriceRange from "./PriceRange";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Filter() {
  const { priceRange } = useSelector((state) => state.products.filters);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[260px] hidden lg:flex flex-col gap-6 border border-gray-300/60 rounded"
    >
      {/* Container Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 overflow-hidden sticky top-24">

        {/* Header */}
        <div className="relative px-6 py-6 border-b border-gray-100/50 bg-gradient-to-br from-white to-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-2xl text-primary">
              <SlidersHorizontal size={20} className="" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-xl tracking-tight">Filters</h2>
              <p className="text-lg text-gray-400 font-medium">Refine your search</p>
            </div>
          </div>

          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none" />
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6">

          {/* Categories Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 rounded-full bg-primary/80"></span>
              <h3 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
                Categories
              </h3>
            </div>
            <div className="flex flex-col gap-2.5">
              <CheckBox />
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Price Range Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-primary/80"></span>
                <h3 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
                  Price Range
                </h3>
              </div>
              {/* Active Price Tag */}
              {(priceRange.min > 0 || priceRange.max !== Infinity) && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold"
                >
                  {priceRange.max === Infinity ? `> $${priceRange.min}` : `$${priceRange.min} - $${priceRange.max}`}
                </motion.div>
              )}
            </div>
            <PriceRange />
          </section>

        </div>
      </div>
    </motion.aside>
  );
}
