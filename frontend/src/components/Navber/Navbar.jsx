import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin } from "../../features/appSlice";
import { Salad } from "lucide-react";
import SearchBer from "../search/SearchBer";
import UserDropdown from "./UserDropdown";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { searchQuery } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.app);

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY.current && window.scrollY > 200) {
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
    <>
      <nav className={`fixed top-0 left-0 w-full  z-50 flex  items-center  duration-500 justify-between px-6 sm:px-6 md:px-16 lg:px-24 xl:px-27 py-4 border-b border-gray-300 bg-white  transition-all ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
        <NavLink to={"/"}>
          <div className="flex gap-2 lg:text-4xl font-extrabold relative">
            {" "}
            <Salad color="green" size={34} /> <p>Grocery</p>
            <div className="size-2 bg-green-600 rounded-full absolute bottom-0 -right-3"></div>
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
      </nav>
      {/* Mobile Menu - moved outside nav to avoid transform context issues */}
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
