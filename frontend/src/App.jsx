import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navber/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import AllProduct from "./pages/AllProduct";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import HotDeals from "./pages/HotDeals";
import Contact from "./pages/Contact";

import { setSearchOpen } from "./features/appSlice";
import SearchBox from "./components/search/SearchBox";
import UserProfile from "./pages/userProfile/UserProfile";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccess from "./components/checkout/PaymentSuccess";
import PaymentFailed from "./components/checkout/PaymentFailed";
import Dashboard from "./components/Dashboard";


export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  const showUserLogin = useSelector((state) => state.app.showUserLogin);

  const searchOpen = useSelector((state) => state.app.searchOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Open Search
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(setSearchOpen(true));
      }

      // ESC Close
      if (e.key === "Escape") {
        dispatch(setSearchOpen(false));
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const inputRef = useRef();
  const onClose = () => dispatch(setSearchOpen(false));
  useEffect(() => {
    if (!searchOpen) return; // only attach listener when overlay is open

    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [searchOpen, dispatch, inputRef]);
  return (
    <div>
      {!hideNavbar && <Navbar />}
      {showUserLogin && <Login />}

      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 " />
      )}
      {searchOpen && (
        <div ref={inputRef} className="">
          <SearchBox onClose={onClose} />
        </div>
      )}
      <Toaster />
      <div className="mt-23">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/hotdeals" element={<HotDeals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailed />} />
        </Routes>
        <div className="fixed bottom-9 right-10">
          <Dashboard/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
