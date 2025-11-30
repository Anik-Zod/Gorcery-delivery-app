import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin, logout, setUser } from "../../features/appSlice";
import { House, ShoppingBag, Info, Contact, Salad, LogOut } from "lucide-react";
import SearchBer from "../search/SearchBer";
import UserDropdown from "./UserDropdown";
import Menu from "./MenuItem";
import axiosInstance from "../../api/axios";

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

  // outside click for mobile nav manue
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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowUserLogin(false));
    axiosInstance.get("/user/logout");
  };

  const[showNav,setShowNav] = useState(true);
const lastScrollY = useRef(0);

const controlNavbar = () => {
  if (window.scrollY > lastScrollY.current) {
    setShowNav(false);
  } else {
    setShowNav(true);
  }
  lastScrollY.current = window.scrollY;
};

useEffect(() => {
  window.addEventListener("scroll", controlNavbar);
  return () => window.removeEventListener("scroll", controlNavbar);
}, []);


  return (
    <nav className={`fixed top-0 left-0 w-full  z-50 flex  items-center  duration-500 justify-between px-6 sm:px-6 md:px-16 lg:px-24 xl:px-27 py-4 border-b border-gray-300 bg-white  transition-all ${showNav ?"translate-y-0":"-translate-y-full"}`}>
      <NavLink to={"/"}>
        <div className="flex gap-2 lg:text-3xl text-green-600">
          {" "}
          <Salad color="green" size={34} /> <p>Grocery</p>
        </div>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-7">
        <NavLink className="hover:text-green-600  text-[16px]" to={"/"}>
          {" "}
          Home
        </NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/products"}>
          All Product
        </NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/hotdeals"}>
          Hot Deal{" "}
        </NavLink>
        <NavLink className="hover:text-green-600  text-[16px]" to={"/contact"}>
          Contact{" "}
        </NavLink>
        <SearchBer />

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
          <div onClick={() => setOpenMenu(!openMenu)}>
            <UserDropdown user={user} />
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

        <nav className="flex flex-col px-6 space-y-7 text-sm bg-white">
          {/* image and */}

          {user && (
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
          )}

          <NavItems
            to="/"
            title="Home"
            onClick={() => setOpen(false)}
            icon={<House size={24} />}
          />
          <NavItems
            to="/products"
            title="All Product"
            onClick={() => setOpen(false)}
            icon={<ShoppingBag size={24} />}
          />
          <NavItems
            to="#"
            title="About"
            onClick={() => setOpen(false)}
            icon={<Info size={24} />}
          />
          <NavItems
            to="/contact"
            title="Contact"
            onClick={() => setOpen(false)}
            icon={<Contact size={24} />}
          />

          {user && (
            <div
              onClick={() => setOpen(false)}
              className=" py-3 text-xl hover:bg-primary-dull/50 rounded-xl w-full"
            >
              <NavLink to="/my-orders" className="flex items-center">
                <ShoppingBag size={20} className="mr-4 ml-2" />
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
              className="cursor-pointer px-6 py-2  flex items-center bg-primary hover:bg-dull transition text-white rounded-xl text-xl w-full "
            >
              <LogOut size={18} className="mr-4" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(setShowUserLogin(true));
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2  bg-primary hover:bg-dull transition text-white rounded-full text-xl w-full "
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </nav>
  );
}

function NavItems({ to, title, onClick, icon }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="hover:text-green-600 flex gap-4 text-xl ml-2 mt-3 "
    >
      {icon}
      {title}
    </NavLink>
  );
}
