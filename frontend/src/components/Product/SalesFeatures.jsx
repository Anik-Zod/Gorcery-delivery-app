

import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  BadgeInfo,
  BadgeCheck,
} from "lucide-react";

export default function SalesFeatures() {
  return (
    <div className="w-full space-y-8 mt-16">

      {/* ===== TOP 3 FEATURES ===== */}
      <div className="grid md:grid-cols-3 gap-4">
        
        {/* Secure Payment */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out  flex flex-col items-center text-center border border-gray-300 rounded-xl p-6 shadow-sm bg-white">
          <ShieldCheck className="text-orange-500" size={36} />
          <h3 className="text-lg font-semibold mt-2">Secure Payment</h3>
          <p className="text-gray-600 text-[18px] mt-1">
            100% secure payment with SSL encryption
          </p>
        </div>

        {/* Fast Delivery */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out flex flex-col items-center text-center border border-gray-300 rounded-xl p-6 shadow-sm bg-white">
          <Truck className="text-orange-500" size={36} />
          <h3 className="text-lg font-semibold mt-2">Fast Delivery</h3>
          <p className="text-gray-600 text-[18px] mt-1">
            Free shipping on orders over $50
          </p>
        </div>

        {/* Easy Returns */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out flex flex-col items-center text-center border border-gray-300 rounded-xl p-6 shadow-sm bg-white">
          <RotateCcw className="text-orange-500" size={36} />
          <h3 className="text-lg font-semibold mt-2">Easy Returns</h3>
          <p className="text-gray-600 text-[18px] mt-1">
            30-day hassle-free returns
          </p>
        </div>

      </div>

      {/* ===== BOTTOM INFO CARDS ===== */}
      <div className="grid md:grid-cols-4 gap-4">

        {/* Product Info */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-orange-500" size={22} />
            <h3 className="font-semibold">Product Info</h3>
          </div>

          <p className=" text-[18px] space-x-7 text-gray-700">
            <span className="font-medium">Stock:</span>{" "}
            <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full text-[15px]">
              8 Available
            </span>
          </p>

          <p className="text-[18px]  text-gray-700 mt-1">
            <span className="font-medium mr-6">Brand:</span> Brand
          </p>

          <p className="text-[18px] text-gray-700 mt-1">
            <span className="font-medium">SKU:</span> #ING-CASE
          </p>
        </div>

        {/* Shipping */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="text-orange-500" size={22} />
            <h3 className="font-semibold">Shipping</h3>
          </div>

          <p className="text-green-600 font-semibold text-[18px] flex items-center gap-1">
            ✓ Free Shipping
          </p>
          <p className="text-[18px] text-gray-700 mt-1">Estimated: 2–5 business days</p>
          <p className="text-[18px] text-gray-700">Express: 1–2 business days</p>
        </div>

        {/* Warranty */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-2">
            <BadgeInfo className="text-orange-500" size={22} />
            <h3 className="font-semibold">Warranty</h3>
          </div>

          <p className="text-[18px] text-gray-700">1 Year Manufacturer Warranty</p>
          <p className="text-[18px] text-gray-700">30 Days Return Policy</p>
          <p className="text-[18px] text-gray-700">Free Tech Support</p>
        </div>

        {/* Quality */}
        <div className="hover:ring-3 hover:ring-primary-dull hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-orange-500" size={22} />
            <h3 className="font-semibold">Quality</h3>
          </div>

          <p className="text-[18px] text-green-600 flex items-center gap-1">✓ Quality Tested</p>
          <p className="text-[18px] text-green-600 flex items-center gap-1">✓ Authentic Product</p>
          <p className="text-[18px] text-green-600 flex items-center gap-1">✓ Secure Packaging</p>
        </div>

      </div>
    </div>
  );
}
