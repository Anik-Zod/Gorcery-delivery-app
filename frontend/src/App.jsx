import React from 'react'
import Navbar from './components/Navber/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import AllProduct from './pages/AllProduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import HotDeals from './pages/HotDeals';
import Contact from './pages/Contact';



export default function App() {
  const isSellerPath = useLocation().pathname.includes('seller');
  const showUserLogin = useSelector(state=>state.app.showUserLogin) 
  
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
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
