import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axios";
import { logout, setShowUserLogin } from "../../features/appSlice";
import { useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";


function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowUserLogin(false));
    axiosInstance.get("/user/logout");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* avatar + name trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex border-2 cursor-pointer border-gray-400/40 rounded-[5px] overflow-hidden max-w-60 px-3 py-1 items-center gap-2"
      >
        <div className="relative">
          <img
            src={user.image}
            className="size-8 object-cover rounded-full border-2 border-gray-300"
            alt="profile_picture"
            loading="lazy"
          />
          <div className="text-green-600 rounded-full absolute -bottom-0.5 -right-1 size-3 border-2 border-gray-300 bg-green-600"></div>
        </div>
        <p>{user.name}</p>
      </div>

      {/* dropdown menu */}
      {open && (
        <div className="absolute -right-20 mt-2 min-w-85 px-4 bg-white shadow-lg rounded-xl border border-gray-100 z-50 overflow-hidden">
          <MenuItem user={user}/>
        </div>
      )}
    </div>
  );
}



export default UserDropdown;
