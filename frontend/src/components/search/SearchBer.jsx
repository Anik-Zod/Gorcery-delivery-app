import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setSearchQuery } from "../../features/productSlice";
import { assets } from "../../assets/assets";
import SearchBox from "./SearchBox";
import { setSearchOpen } from "../../features/appSlice";

function SearchBer() {
   const {searchOpen} = useSelector((state) => state.app);
   const dispatch = useDispatch();
  

  return (
    <div className="hidden relative lg:flex cursor-pointer items-center text-sm gap-2 py-2 border-2 border-gray-400/40 px-3 w-64  rounded-md">
      <div className="flex gap-4 " onClick={() => dispatch(setSearchOpen(true))}>
        <img src={assets.search_icon} alt="" />
        <input
          className=" w-full  text-[16px] bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search products ..."
        />
        <p className=" bg-gray-300/60 absolute top-1 bottom-1 right-1 rounded flex items-center px-3">ctrl + k</p>
      </div>
    </div>
  );
}

export default SearchBer;
