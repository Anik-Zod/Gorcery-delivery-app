import {
  User,
  Settings,
  ShoppingCart,
  LogOut,
  HelpCircleIcon,
} from "lucide-react";
import { logout } from "../../features/appSlice";
import { useDispatch } from "react-redux";

export default function MenuItem({ user }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="mb-4">
        {/* image and */}
        <div className="flex gap-3 py-3 mb-2 border-b border-gray-300  items-center">
          <div>
            <img
              src={user.image}
              alt="user image"
              loading="lazy"
              className="size-13 object-cover rounded-full border-2 border-gray-300"
            />
          </div>

          <div className="">
            <p className="font-bold tracking-wide text-xl">{user.name}</p>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <p className="flex tracking-tight gap-4 py-3 px-5 cursor-pointer hover:bg-primary/30 rounded-xl">
          <User /> My Profile
        </p>
        <p className="flex tracking-tight gap-4 py-3 px-5 cursor-pointer hover:bg-primary/30 rounded-xl">
          <ShoppingCart /> My Orders
        </p>
        <p className="flex tracking-tight gap-4 py-3 px-5 cursor-pointer hover:bg-primary/30 rounded-xl">
          <Settings /> Settings
        </p>
        <p className="flex tracking-tight gap-4 py-3 px-5 cursor-pointer hover:bg-primary/30 rounded-xl">
          <HelpCircleIcon /> Help & Supports
        </p>
        <p
          onClick={handleLogout}
          className="flex tracking-tight gap-4 py-3 px-5 cursor-pointer hover:bg-red-600/20 hover:text-red-600 rounded-xl"
        >
          <LogOut /> Logout
        </p>
      </div>
    </div>
  );
}
