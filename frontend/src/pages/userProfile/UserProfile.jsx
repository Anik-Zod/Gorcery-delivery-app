import { Bell, Clock, Heart, Settings, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* Animations */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function UserProfile() {

  const { user } = useSelector((state) => state.app);
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate();

  const { data } = useFetch(
    "orders",
    user?._id ? `/order/myOrder/${user._id}` : null,
    { enabled: !!user?._id }
  );

  useEffect(() => {
    if (data) setMyOrders(data.orders || []);
    else setMyOrders([]);
  }, [data]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6"
    >

      {/* HEADER */}
      <motion.div 
        variants={fadeUp}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur shadow-md rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.06 }}
            src={user.image}
            alt="user"
            className="size-20 object-cover rounded-full border-4 border-green-500 shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, <span className="text-green-600">{user.name}</span>
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile-settings")}
          className="mt-4 md:mt-0 px-6 py-2 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700"
        >
          Edit Profile
        </motion.button>
      </motion.div>

      {/* STATS */}
      <motion.div 
        variants={container}
        className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
      >
        <StatCard title="Orders" value={myOrders.length} icon={<ShoppingBag />} desc="All orders" />
        <StatCard title="Notifications" value={0} icon={<Bell />} desc="Unread alerts" />
        <StatCard title="Points" value={user.rewardPoints} icon={<Star />} desc="Reward points" />
        <StatCard title="Settings" value={4} icon={<Settings />} desc="Preferences" />
      </motion.div>

      {/* BODY */}
      <motion.div 
        variants={container}
        className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >

        {/* QUICK ACTIONS */}
        <motion.div 
          variants={fadeUp}
          className="bg-white rounded-2xl shadow p-5"
        >
          <h3 className="font-bold text-lg flex gap-2 text-gray-700"><TrendingUp /> Quick Actions</h3>
          <p className="text-gray-400 text-sm mb-4">Frequently used options</p>

          <div className="space-y-3">
            <ActionButton icon={<ShoppingBag />} label="Orders" to="/my-orders" />
            <ActionButton icon={<Bell />} label="Notifications" to="/notifications" />
            <ActionButton icon={<Heart />} label="Wishlist" to="/wishlist" />
            <ActionButton icon={<Settings />} label="Settings" to="/profile-settings" />
          </div>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div variants={fadeUp} className="md:col-span-2 bg-white rounded-2xl shadow p-5">
          <h3 className="font-bold text-lg flex gap-2 text-gray-700"><Clock /> Recent Activity</h3>
          <p className="text-gray-400 text-sm mb-4">Latest orders & actions</p>

          <ul className="divide-y">
            {myOrders.map((item, i) => (
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                key={i}
                className="py-3 flex justify-between text-gray-700"
              >
                <span>Ordered {item.items.length} items</span>
                <span className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}


/* COMPONENTS */

function StatCard({ title, value, icon, desc }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md hover:shadow-xl rounded-2xl p-5 flex justify-between items-center"
    >
      <div className="bg-green-100 text-green-600 p-3 rounded-xl">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}


function ActionButton({ icon, label, to }) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(to)}
      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 border rounded-xl hover:bg-green-50"
    >
      <span className="bg-green-600 text-white p-2 rounded-xl">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </motion.button>
  );
}
