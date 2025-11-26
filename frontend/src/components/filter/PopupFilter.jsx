import { motion, AnimatePresence } from "motion/react";
import Filter from "./Filter";
import CheckBox from "./CheckBox";
import PriceRange from "./PriceRange";


export default function PopupFilter({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blur Background */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        
          />
           
          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-40"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className=" flex justify-between  items-center font-semibold text-xl text-primary-dull px-5 py-4 bg-primary/10">
              <p className="tracking-wider">Filter</p>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="px-4 max-h-[70vh] overflow-y-auto">
              <Filter />
            </div>

            <div className="px-5 mb-4">
              <p className="font-bold text-black/60">Categories</p>
              <div className="flex flex-col gap-1 ml- mt-3">
                <CheckBox />
              </div>
            </div>
            <div className="pt-4 ml-4 border-primary/20 border-t ">
              <PriceRange  />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
