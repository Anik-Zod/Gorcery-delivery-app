import { Bell, Clock, Heart, Settings, ShoppingBag, Star } from "lucide-react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* Animations */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
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
      className="min-h-screen p-6 bg-gray-50 "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* PROFILE SIDEBAR */}
        <motion.div
          variants={fadeUp}
          className="bg-gradient-to-br from-white to-green-50 rounded-3xl  p-6 flex flex-col items-center"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            src={user.image}
            alt="user"
            className="w-28 h-28 rounded-full border-4 border-green-500  object-cover"
          />
          <h2 className="mt-4 text-xl md:text-2xl font-bold text-gray-800 text-center">{user.name}</h2>
          <p className="text-gray-500 text-sm text-center">{user.email}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile-settings")}
            className="mt-6 px-6 py-2 border-2 text-black font-semibold rounded-xl  hover:bg-green-700 hover:text-white transition-all duration-500 cursor-pointer w-full"
          >
            Edit Profile
          </motion.button>

          <div className="mt-8 w-full flex flex-col gap-3">
            <ActionButton icon={<ShoppingBag />} label="Orders" to="/my-orders" color="#EFF6FF"/>
            <ActionButton icon={<Bell />} label="Notifications" to="/notifications" color="#F0FDF4" />
            <ActionButton icon={<Heart />} label="Wishlist" to="/wishlist" color="#FAF5FF"/>
            <ActionButton icon={<Settings />} label="Settings" to="/profile-settings" color="#F9FAFB"/>
          </div>
        </motion.div>

        {/* MAIN DASHBOARD */}
        <div className="md:col-span-3 flex flex-col gap-6">

          {/* STAT CARDS */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard title="Orders" value={myOrders.length} icon={<ShoppingBag />} color="green" />
            <StatCard title="Notifications" value={0} icon={<Bell />} color="blue" />
            <StatCard title="Reward Points" value={user.rewardPoints} icon={<Star />} color="yellow" />
            <StatCard title="Settings" value={4} icon={<Settings />} color="purple" />
          </motion.div>

          {/* RECENT ACTIVITY */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-3xl  p-6"
          >
            <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg">
              <Clock /> Recent Activity
            </h3>
            <p className="text-gray-400 text-sm mb-4">Your latest orders & actions</p>

            <ul className="divide-y divide-gray-200 h-100 overflow-auto">
              {myOrders.length === 0 ? (
                <li className="text-gray-500 py-3 text-center">No recent activity</li>
              ) : (
                myOrders.map((order, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3 flex justify-between items-center hover:bg-green-50 rounded-lg px-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Images */}
                      <div className="flex space-x-1">
                        {order.items.map((item, idx) => (
                          <img
                            key={idx}
                            src={item.product.image[0]} // make sure product.image exists
                            alt={item.product.name}
                            className="size-15 rounded-full border-2 border-white shadow-sm object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-medium border-2 border-white">
                            +{order.items.length - 3}
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Ordered {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </span>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* COMPONENTS */
function StatCard({ title, value, icon, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600"
  };
  return (
    <motion.div className="bg-white border border-gray-300 rounded-2xl py-3 px-3 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className={`${colors[color]} p-3 rounded-xl`}>{icon}</div>
        <div>
          <p className="text-gray-500 text-md">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label, to , color}) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      className={`w-full flex items-center gap-3 px-4 py-3  border border-gray-200 rounded-xl hover:bg-green-50 transition`}
      style={{backgroundColor:color}}
    >
      <span className="bg-green-600 text-white p-2 rounded-xl">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </motion.button>
  );
}
