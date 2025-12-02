import { LogOut, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../features/productSlice";
import { useState } from "react";
import { motion } from "motion/react";
import OffersCard from "./OffersCard";
import Spinner from "./Spinner";

function MainBanner() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("Pepsi");

  const handleChange = () => {
    dispatch(setSearchQuery(input));
  };

  return (
    <div className="mt-32 relative w-full overflow-hidden">
      {/* absolute div */}
      <div className="absolute  inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)] ">
        <Spinner />
        
      </div>

      <div className="">
        {/* MAIN HEADING */}
        <div className="text-center">
          <h1 className="text-black text-4xl md:text-6xl font-semibold drop-shadow-sm tracking-tight">
            Freshness You Can Trust,
          </h1>
          <h1 className="text-primary text-4xl md:text-6xl tracking-tight">
            Savings You’ll Love!
          </h1>
        </div>

        {/* OFFERS CARDS (Desktop) */}
        <div className="hidden sm:flex mt-12 justify-center items-center lg:gap-8 gap-0">
          {[
            {
              service: "Fast Delivery",
              from: "From Nearest Store",
              discount: "Up To 60% Off",
              image: "1.png",
            },
            {
              service: "Handpicked Quality",
              from: "Unbeatable Prices",
              discount: "Up To 40% Off",
              image: "2.png",
            },
            {
              service: "Farm-Fresh Picks",
              from: "Just a Click Away",
              discount: "Up To 10% Off",
              image: "3.png",
            },
          ].map((card, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              key={index}
            >
              <OffersCard key={index} {...card} />
            </motion.div>
          ))}
        </div>

        {/* SEARCH BAR (Mobile) */}
        <div className="sm:hidden mt-10 px-4 mb-4 relative">
          <div className="relative w-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl py-3 pl-5 pr-12 
            shadow-sm bg-white/70 backdrop-blur-lg focus:ring-2 focus:ring-primary 
            transition-all outline-none"
              placeholder="Search fresh products..."
            />

            <Search
              onClick={handleChange}
              className="absolute right-4 top-3 text-primary cursor-pointer hover:scale-105 transition"
              size={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
