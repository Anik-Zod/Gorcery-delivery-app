import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin, logout } from "../../features/appSlice";
import {
    House,
    ShoppingBag,
    Info,
    Contact,
    LogOut,
    X,
    User,
    ChevronRight,
    Heart,
    Settings,
} from "lucide-react";
import axiosInstance from "../../api/axios";
import { assets } from "../../assets/assets";

export default function Sidebar({ open, setOpen }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.app);
    const menuRef = useRef();

    // Close sidebar on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setShowUserLogin(false));
        axiosInstance.get("/user/logout");
        setOpen(false);
    };

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                aria-hidden="true"
            />

            {/* Sidebar Container */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-[85%] sm:w-[350px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 -mr-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-red-500 transition-colors duration-200 focus:outline-none"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* User Profile Section */}
                    {user ? (
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={user.image || assets.profile_icon}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 truncate">
                                        {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-gray-50 text-center">
                            <p className="text-gray-500 text-sm mb-4">Welcome to Grocery App</p>
                            <button
                                onClick={() => {
                                    dispatch(setShowUserLogin(true));
                                    setOpen(false);
                                }}
                                className="w-full py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:bg-green-700 transition-all duration-300 transform active:scale-95"
                            >
                                Sign In / Register
                            </button>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-2">
                        <div className="space-y-1">
                            <NavItem
                                to="/"
                                icon={<House size={20} />}
                                label="Home"
                                onClick={handleLinkClick}
                            />
                            <NavItem
                                to="/products"
                                icon={<ShoppingBag size={20} />}
                                label="All Products"
                                onClick={handleLinkClick}
                            />
                            <NavItem
                                to="/hotdeals"
                                icon={<Info size={20} />}
                                label="Hot Deals"
                                onClick={handleLinkClick}
                                badge="New"
                            />
                            <NavItem
                                to="/contact"
                                icon={<Contact size={20} />}
                                label="Contact Us"
                                onClick={handleLinkClick}
                            />
                        </div>

                        {user && (
                            <>
                                <div className="my-4 border-t border-gray-100" />
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Account
                                </div>
                                <NavItem
                                    to="/my-orders"
                                    icon={<ShoppingBag size={20} />}
                                    label="My Orders"
                                    onClick={handleLinkClick}
                                />
                                <NavItem
                                    to="/profile"
                                    icon={<User size={20} />}
                                    label="Profile Settings"
                                    onClick={handleLinkClick}
                                />
                            </>
                        )}
                    </nav>
                </div>

                {/* Footer actions */}
                {user && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-red-600 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:shadow-md font-medium group"
                        >
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Log Out</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

function NavItem({ to, icon, label, onClick, badge }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
            }
        >
            <div className="flex items-center gap-4">
                <span className={`transition-transform duration-200 group-hover:scale-110 ${badge === "New" ? "text-orange-500" : ""}`}>
                    {icon}
                </span>
                <span>{label}</span>
            </div>

            <div className="flex items-center gap-2">
                {badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-orange-500 rounded-full shadow-sm">
                        {badge}
                    </span>
                )}
                <ChevronRight
                    size={16}
                    className="text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-400"
                />
            </div>
        </NavLink>
    );
}
