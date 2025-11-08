import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin, logout, setUser } from "../features/appSlice";
import { setSearchQuery } from "../features/productSlice";
import axiosInstance from "../api/axios";
import {House, CalendarArrowDown, ShoppingBag, Info, Contact } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { searchQuery } = useSelector((state) => state.products);
  const { user, showUserLogin } = useSelector((state) => state.app);

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowUserLogin(false));
    axiosInstance.get("/user/logout");
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);
  
const manuRef = useRef();

useEffect(() => {
  const handleClickOutside = (e) => {
    if (manuRef.current && !manuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <nav className="flex items-center justify-between px-6 sm:px-6 md:px-16 lg:px-24 xl:px-27 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to={"/"}>
        <img
          className="h-10"
          src="https://res.cloudinary.com/dj6y31jyx/image/upload/v1752504763/logo_lppprr.png"
          alt="dummyLogoColored"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to={"/"}> Home</NavLink>
        <NavLink to={"/products"}>All Product</NavLink>
        
        {user && (
          <div
            onClick={() => setOpen(false)}
            className="bg-primary/20 px-3 py-2 hover:bg-primary-dull rounded-xl"
          >
            <NavLink to={"/my-orders"} className="block">
              My Orders
            </NavLink>
          </div>
        )}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={handleSearch}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} className="w-6 opacity-60" alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {cart.length}
          </button>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <img src={user.image} className="size-10 object-cover rounded-full " alt="profile_picture" loading="lazy" />
            <p>{user.name}</p>
            <button
              onClick={handleLogout}
              className=" cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm"
            >
              logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              dispatch(setShowUserLogin(true));
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="" />
      </button>

      {/* Mobile Menu */}
      <div
      ref={manuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col px-6 space-y-4 text-sm">
          <NavLink onClick={() => setOpen(false)} to="/" className="block">
            <div className="flex gap-3">
             <House size={18}/>
              Home
            </div>
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/products"
            className="block"
          >
            <div className="flex gap-4">
            <ShoppingBag size={16} />
            All Product
            </div>
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="#" className="block">
            <div className="flex gap-3">
           <Info size={16}/>
            About
            </div>
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/contact"
            className="block"
          >
            <div className="flex gap-3">
             <Contact size={16}/>
            Contact
            </div>
          </NavLink>

          {user && (
            <div
              onClick={() => setOpen(false)}
              className="bg-primary/20 px-3 py-2 hover:bg-primary-dull rounded-xl w-full"
            >
              <NavLink to="/my-orders" className="block">
                My Orders
              </NavLink>
            </div>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm w-35 text-center"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(setShowUserLogin(true));
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm w-full text-center"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </nav>
  );
}
