import { useNavigate } from "react-router-dom";
import { LogOut, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/productSlice";
import { useState } from "react";
import {motion} from "motion/react"

function MainBanner() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("Pepsi");

  const handleChange = () => {
    dispatch(setSearchQuery(input));
  };

  return (
    <div className="mt-12 relative w-full">

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
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:1}}
          >
            <OffersCard key={index} {...card} />
          </motion.div>
        ))}
      </div>

      {/* SEARCH BAR (Mobile) */}
      <div className="sm:hidden mt-10 px-4 relative">
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
  );
}

export default MainBanner;

export function OffersCard({ service, from, discount, image }) {
  const navigate = useNavigate();

  return (
    <div
      className="group lg:w-82 h-72 bg-white/70 backdrop-blur-xl rounded-3xl shadow-md 
        hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between 
        border border-white/40 cursor-pointer"
    >
      {/* TEXT */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 group-hover:text-primary transition">
          {service}
        </h1>
        <p className="uppercase text-gray-500 text-sm mt-1">{from}</p>

        <p className="uppercase bg-primary/10 text-primary text-xs font-semibold 
          rounded-full px-3 py-1 mt-3 inline-block">
          {discount}
        </p>
      </div>

      {/* IMAGE + BUTTON */}
      <div className="relative flex justify-center items-center mt-4">
        <motion.img
        whileHover={{scale:1.1}}
          src={image}
          alt="Food"
          className="h-36 object-contain"
        />

        <div
          onClick={() => navigate("/products")}
          className="absolute left-0 w-11 h-11 bg-primary text-white rounded-full 
            flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <LogOut size={18} />
        </div>
      </div>
    </div>
  );
}
