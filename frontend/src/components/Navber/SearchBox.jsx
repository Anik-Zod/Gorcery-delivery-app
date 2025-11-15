import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../features/productSlice";
import { assets } from "../../assets/assets";

function SearchBox() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <div className="hidden lg:flex  items-center text-sm gap-2 py-2 border-2 border-gray-400/40 px-3  rounded">
        <img src={assets.search_icon} alt="" />
      <input
        onChange={handleSearch}
        className=" w-full  text-[16px] bg-transparent outline-none placeholder-gray-500"
        type="text"
        placeholder="Search products ..."
      />
    </div>
  );
}

export default SearchBox;
