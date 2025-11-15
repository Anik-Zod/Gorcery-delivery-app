import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin, logout, setUser } from "../../features/appSlice";
import {House, ShoppingBag, Info, Contact, Salad } from 'lucide-react';
import SearchBox from "./SearchBox";
import UserDropdown from "./UserDropdown";
import Menu from "./MenuItem";

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { searchQuery } = useSelector((state) => state.products);
  const { user, showUserLogin } = useSelector((state) => state.app);

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();




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
    <nav className="flex relative items-center justify-between px-6 sm:px-6 md:px-16 lg:px-24 xl:px-27 py-4 border-b border-gray-300 bg-white  transition-all">
      <NavLink to={"/"}>
        <div className="flex gap-2 text-3xl text-green-600"> <Salad color="green" size={34}/> <p>Grocery</p></div>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink className="hover:text-green-600  text-[16px]" to={"/"}> Home</NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/products"}>All Product</NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/hotdeals"}>Hot Deal </NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/contact"}>Contact </NavLink>
       <SearchBox/>

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
          <div onClick={()=>setOpenMenu(!openMenu)}>
            <UserDropdown user={user}/>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              dispatch(setShowUserLogin(true));
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-xs text-sm"
          >
            Sign in
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
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-xl text-sm w-35 text-center"
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
              Sign in
            </button>
          )}
        </nav>
      </div>
    </nav>
  );
}
