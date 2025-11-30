import { useEffect, useState } from "react";
import { Flame, Timer, Package, Percent, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Deals() {
  const [time, setTime] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 35,
  });

  // COUNTDOWN TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-full rounded-2xl p-10 mt-8 
        bg-gradient-to-r from-[#f3310f] via-[#ff6a3d] to-[#ff961c]
        text-white relative overflow-hidden"
        initial={{ backgroundPosition: "0% 0%" }}
        whileInView={{ backgroundPosition: "100% 100%" }}
        viewport={{ once: false }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {/* Floating Fire */}
        <motion.div
          className="absolute right-10 top-10 opacity-20"
          initial={{ y: 0 }}
          whileInView={{ y: [-5, 5, -5] }}
          viewport={{ once: false }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Flame size={70} />
        </motion.div>

        {/* Badges */}
        <motion.div
          className="flex gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-white/20 px-4 py-1 rounded-full text-sm font-semibold"
          >
            <motion.div
              whileInView={{ rotate: [-10, 10, -10] }}
              viewport={{ once: false }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame size={16} />
            </motion.div>
            HOT DEALS
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold"
          >
            Up to 20% OFF
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-10">

          {/* LEFT CONTENT */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              Weekly Hot Deals
            </motion.h1>

            <motion.p
              className="text-white/90 mt-4 hidden md:block leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              Don’t miss out on these incredible limited-time offers! Save big!
            </motion.p>

            {/* STATS */}
            <motion.div
              className="sm:grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8  sm:w-160 hidden"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <StatBox icon={<Package size={35} />} label="Products" value="13" />
              <StatBox icon={<Percent size={35} />} label="Avg. Discount" value="12%" />
              <StatBox icon={<Users size={35} />} label="Happy Customers" value="2.5K+" />
            </motion.div>
          </motion.div>

          {/* COUNTDOWN BOX */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg py-6 px-2 rounded-2xl border border-white/20 w-full lg:w-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-red-900 font-semibold mb-4">
              <Timer size={20} /> Deal Ends In:
            </div>

            <div className="flex gap-2 sm:gap-4">
              <TimeBox label="Days" value={time.days} />
              <TimeBox label="Hours" value={time.hours} />
              <TimeBox label="Mins" value={time.minutes} />
              <div className="hidden sm:block">
                <TimeBox label="Secs" value={time.seconds} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- STAT BOX ---------- */
function StatBox({ icon, label, value }) {
  return (
    <motion.div
      className="bg-white/20  backdrop-blur-md w-full rounded-xl py-4 px-4 cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <motion.div
        className="flex items-center gap-2  text-[19px] text-white/90"
        whileInView={{ x: [0, 3, 0] }}
        viewport={{ once: false }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
      <span>{label}</span>
      </motion.div>
      
      <h2 className="text-2xl flex gap-4 items-center font-bold mt-1"><span>{icon}</span> {value}</h2>
    </motion.div>
  );
}

/* ---------- TIME BOX (FLIP) ---------- */
function TimeBox({ label, value }) {
  return (
    <motion.div
      className="sm:block bg-white text-gray-800 font-bold px-6 py-4 rounded-xl shadow overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={value} // keep this for animation replay
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="text-3xl"
      >
        {value.toString().padStart(2, "0")}
      </motion.div>

      <div className="text-sm font-medium text-gray-600">{label}</div>
    </motion.div>
  );
}

