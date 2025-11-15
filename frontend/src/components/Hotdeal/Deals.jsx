import { useEffect, useState } from "react";
import { Flame, Timer, Package, Percent, Users} from "lucide-react";

export default function Deals() {
  // COUNTDOWN TIMER (dummy 2 days)
  const [time, setTime] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 35,
  });

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
    <div className=" mt-16 overflow-x-clip">
    <div className="w-full rounded-3xl p-10 mt-8 bg-gradient-to-r from-[#ff4b2b] via-[#ff6a3d] to-[#ff961c] text-white">

      {/* Badges */}
      <div className="flex gap-3">
        <div className="flex items-center gap-1 bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold">
          <Flame size={16} /> HOT DEALS
        </div>

        <div className="flex items-center bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Up to 20% OFF
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-10">

        {/* LEFT TEXT CONTENT */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold">Weekly Hot Deals</h1>

          <p className="text-white/90 mt-4 hidden md:block leading-relaxed text-lg">
            Don’t miss out on these incredible limited-time offers! Save big on your favorite products
            with discounts up to 20% off. Limited stock available.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
            {/* Products */}
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl">
              <div className="flex items-center gap-2 text-white/90">
                <Package size={20} /> <span>Products</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">13</h2>
            </div>

            {/* Avg Discount */}
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl">
              <div className="flex items-center gap-2 text-white/90">
                <Percent size={20} /> <span>Avg. Discount</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">12%</h2>
            </div>

            {/* Happy Customers */}
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl">
              <div className="flex items-center gap-2 text-white/90">
                <Users size={20} /> <span>Happy Customers</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">2.5K+</h2>
            </div>
          </div>
        </div>

        {/* RIGHT COUNTDOWN BOX */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-red-900 font-semibold mb-4">
            <Timer size={20} /> Deal Ends In:
          </div>

          <div className="flex gap-4">
            {/* Time Block */}
            <TimeBox label="Days" value={time.days} />
            <TimeBox label="Hours" value={time.hours} />
            <TimeBox label="Mins" value={time.minutes} />
            <TimeBox label="Secs" value={time.seconds} />
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className="hidden md:block bg-white text-gray-800 font-bold px-6 py-4 rounded-xl shadow">
      <div className="text-3xl">{value.toString().padStart(2, "0")}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
}


