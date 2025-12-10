import { Crown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function HoverFill() {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <div>
      <div
        className="
      relative rounded-full overflow-hidden group cursor-pointer 
        bg-linear-to-l from-green-700 to-green-500
        inline-flex
      "
      >
        {/* BASE CONTENT */}
        <div className="relative z-20 py-2 px-2 gap-3 text-white flex items-center">
          {/* Crown button */}
          <motion.div
            animate={{ rotate: [30, 0, -30, 0] }}
            transition={{ repeatType: "mirror", repeat: Infinity }}
            onClick={() => setDashboardOpen((prev) => !prev)}
            className="p-2 text-gray-700 rounded-full bg-green-100 cursor-pointer"
          >
            <Crown />
          </motion.div>

          {/* Expandable Message */}
          <AnimatePresence>
            {dashboardOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <a
                  href="https://dashboard-grocery.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold whitespace-nowrap pr-2"
                >
                  Visit Admin Dashboard
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HOVER FILL OVERLAY */}
        <div
          className="
          absolute inset-0 
          bg-orange-400 
          scale-y-0 
          origin-top
          transition-transform duration-500 
          group-hover:scale-y-100
          z-10
          "
        />
      </div>
      {/* X button */}
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: dashboardOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          onClick={() => setDashboardOpen(false)}
          className="absolute -top-4 right-0 z-30 cursor-pointer text-white bg-black/40 p-1 rounded-full"
        >
          <X size={20} />
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
