import ProductCard from "../product/ProductCard";
import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/productSlice";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
// import { setSearchOpen } from "../../features/appSlice";

function SearchBox({ onClose }) {
    const dispatch = useDispatch();
    const handleSearch = (e) => {
      dispatch(setSearchQuery(e.target.value));
    };


    const {
    data: products,
    isLoading,
    isError,
    error,
  } = useFetch("products", "/product/list");
    const searchQuery = useSelector((state) => state.products.searchQuery);
    const [filterProducts, setFilterProducts] = useState([]);
    const debouncedText = useDebounce(searchQuery, 400);

    useEffect(()=>{
     if(!products)return
     const filtered = products?.filter((product)=>{
        const matchesSearch = debouncedText?.length === 0 ||
        product.name.toLowerCase().includes(debouncedText.toLowerCase());
        
        const matchesCategory = debouncedText?.length === 0 ||
         product.category.toLowerCase().includes(debouncedText.toLowerCase());
        return matchesSearch || matchesCategory
    })
    setFilterProducts(filtered);
    }, [debouncedText, products])

  return (
    <div className="fixed z-50 left-1/2 top-1/2 w-[67%] h-[90%] md:max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-white shadow-xl overflow-hidden animate-scaleIn">
      {/* HEADER */}
      <div className="bg-gradient-to-r  to-green-600 from-[#083F29] text-white  px-4 py-7">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 justify-center items-center ml-3">
            <div className="bg-white/30 p-3 rounded-full">
              <Search />
            </div>
            <h2 className="font-semibold text-xl">Search Products <span className="text-sm bg-[#2F6B46] border-[0.5px] border-gray-200 py-1 px-3 rounded-md ml-5">Ctrl + K</span></h2>
          </div>
          <button className="mr-10 cursor-pointer transition  hover:rotate-20 hover:bg-white/30 rounded-full p-1" onClick={() => onClose && onClose()}>
            <X size={30} />
          </button>
        </div>
        {/* SEARCH INPUT */}
        <div className="px-4 mt-6 relative">
          <input
            autoFocus
            onChange={handleSearch}
            type="text"
            placeholder="Search your favorite products..."
            className="pl-14 w-full text-[16px] rounded-2xl border border-white/30 px-4 py-2 focus:ring-2 focus:bg-white/20 bg-white/10 focus:ring-gray-500 outline-none"
          />
          <div className="text-white/40 absolute top-[12px] left-12">
            <Search size={20}/>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="h-107 overflow-y-auto px-4 pb-4">
        <div className="w-full flex mt-6 justify-center mb-3">
          <div className="p-3 bg-gradient-to-b from-green-800 to-green-600 rounded-full">
            <Search color="white" size={20} />
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-[24px] font-semibold">Discover Amazing Products</p>
          <p className="text-xl text-gray-600 ">
            Search and explore thousands of products
          </p>
        </div>
        <h3 className="mb-3 text-center text-lg font-medium text-gray-600">
          Popular Products
        </h3>

        <div className=" grid grid-cols-3 sm:grid-cols-4 gap-3">
            {filterProducts.length > 0 &&  filterProducts.slice(0,4).map((product) => (
              <div key={product._id}>
                <ProductCard product={product} onNavigate={() => onClose && onClose()} />
              </div>
            ))}
        </div>
      </div>
       
    </div>
  );
}


export default SearchBox;
