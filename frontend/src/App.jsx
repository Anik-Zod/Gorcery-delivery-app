import React, { useEffect, useState } from 'react'
import Navbar from './components/Navber/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/auth/Login';
import AllProduct from './pages/AllProduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import HotDeals from './pages/HotDeals';
import Contact from './pages/Contact';
import OAuthCallback from './components/auth/OAuthCallback';
import { setSearchOpen } from './features/appSlice';
import SearchBox from './components/search/SearchBox';
import UserProfile from './pages/userProfile/UserProfile';



export default function App() {
  const isSellerPath = useLocation().pathname.includes('seller');
  const showUserLogin = useSelector(state=>state.app.showUserLogin) 



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

  return (
    <div>
      
      {isSellerPath?null:<Navbar/>}
      {showUserLogin && <Login/>}
      <Toaster/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory/>} />
          <Route path="/products/:category/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/hotdeals" element={<HotDeals/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/add-address" element={<AddAddress/>} />
          <Route path="/my-orders" element={<MyOrders/>} />
          <Route path="/me" element={<OAuthCallback/>}/>
          <Route path="/profile/*" element={<UserProfile/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
