import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/productSlice";
import { assets } from "../../assets/assets";
import SearchBox from "./SearchBox";
import { setSearchOpen } from "../../features/appSlice";

function SearchBer() {
   const {searchOpen} = useSelector((state) => state.app);
   const dispatch = useDispatch();
  

  const inputRef = useRef()
  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(inputRef.current && !inputRef.current.contains(e.target)){
        dispatch(setSearchOpen(false))
      }
    }
    document.addEventListener("mouseup",handleClickOutside)
    return()=> document.removeEventListener("mouseup",handleClickOutside)
  })
  return (
    <div className="hidden lg:flex cursor-pointer items-center text-sm gap-2 py-2 border-2 border-gray-400/40 px-3  rounded-md">
      <div className="flex gap-4 relative" onClick={() => dispatch(setSearchOpen(true))}>
        <img src={assets.search_icon} alt="" />
        <input
          className=" w-full  text-[16px] bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search products ..."
        />
        <p className=" bg-primary/30 text-primary-dull absolute -right-2 -top-[2px]   py-1 px-3 rounded-md">ctrl + k</p>
      </div>
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 " />
      )}

      {searchOpen && (
        <div ref={inputRef} className="z-50 ">
          <SearchBox />
        </div>
      )}
    </div>
  );
}

export default SearchBer;
