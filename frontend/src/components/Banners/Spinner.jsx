import React from "react";
import { motion } from "motion/react";

const Spinner = React.memo(function Spinner() {
  const ringStyle = "absolute border-2 rounded-full border-emerald-300/5 shadow-[0_0_80px_inset] shadow-primary-dull/50 will-change-transform";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Right Oval */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: "50%", y: "-50%" }}
        whileInView={{ opacity: 1, scale: 1, x: "10%", y: "-70%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`${ringStyle} size-[1000px] top-0 right-0 origin-center`}
      />

      {/* Bottom Left Oval */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "50%" }}
        whileInView={{ opacity: 1, scale: 1, x: "-40%", y: "60%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className={`${ringStyle} size-[1000px] bottom-0 left-0 origin-center`}
      />
    </div>
  );
});

export default Spinner;
