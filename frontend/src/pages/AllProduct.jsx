import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import Filter from "../components/filter/Filter";
import { Funnel, X } from "lucide-react";
import PopupFilter from "../components/filter/PopupFilter";
import { clearCategory, clearPrice, clearSearchQuery } from "../features/productSlice";
import CardSkeleton from "../components/CardSkeleton";

const ProductCard = lazy(() => import("../components/Product/ProductCard"));

function AllProduct() {
  const dispatch = useDispatch();

  const {
    data: products=[],
    isLoading,
  } = useFetch("products", "/product/list");

  const searchQuery = useSelector((state) => state.products.searchQuery);
  const { categories, priceRange } = useSelector(
    (state) => state.products.filters
  );

  const [filterProducts, setFilterProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const debouncedText = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (!products) return;

    // Combined filtering
    const filtered = products?.filter((product) => {
      // 1. Text search
      const matchesSearch =
        debouncedText?.length === 0 ||
        product.name.toLowerCase().includes(debouncedText.toLowerCase());

      // 2. Category filter
      const matchesCategory =
        categories?.length === 0 ||
        categories.some(
          (cat) => cat.toLowerCase() === product.category.toLowerCase()
        );

      // 3. Price filter
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      // 4. Must be in stock
      const inStock = product.inStock;

      // 5. search by category name also
      const searchByCategory =
        debouncedText?.length === 0 ||
        product.category.toLowerCase().includes(debouncedText.toLowerCase());

      return (
        (matchesSearch || searchByCategory) &&
        matchesCategory &&
        matchesPrice &&
        inStock
      );
    });

    setFilterProducts(filtered);
  }, [products, debouncedText, categories, priceRange]);

  return (
    <div className=" lg:px-24 px-5 md:px-10 mt-10 mx-auto relative">
      <div className="flex border justify-between gap-10 border-black/10 py-4 border-x-0">
        <div className="flex  lg:space-x-30 md:space-x-10 justify-between">
          <div className="flex flex-col w-full">
            <p className="text-2xl font-medium uppercase">All Products</p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          </div>
          <div className="flex gap-4">
            {categories.length > 0 && (
              <div
                onClick={() => dispatch(clearCategory())}
                className="md:flex bg-primary/20 justify-center items-center py-2 px-4 rounded-md hidden text-primary-dull cursor-pointer hover:scale-105 hover:animate-pulse transition"
              >
                <span>
                  <X size={20}/>
                </span>
                Category
              </div>
            )}
            {priceRange.min > 0 && priceRange.max < 1000 && (
              <div
                onClick={() => dispatch(clearPrice())}
                className="md:flex bg-[#F3E8FF] justify-center items-center py-2 px-4 rounded-md transition hidden text-[#6E11B0] cursor-pointer hover:scale-105 hover:animate-pulse"
              >
                <span>
                  <X size={20}/>
                </span>
                Price
              </div>
            )}
            {searchQuery.length > 0 && (
              <div
                onClick={() => dispatch(clearSearchQuery())}
                className="md:flex gap-2 bg-[#DBEAFE] justify-center items-center py-2 px-3 rounded-md hidden text-blue-600 cursor-pointer hover:scale-105 hover:animate-pulse transition"
              >
                <span className="hover:text-red-700/80">
                  <X  size={20}/>
                </span>
                Filter
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setOpenFilter((p) => !p)}
          className="items-center flex gap-2 justify-end mr-10 lg:hidden hover:scale-110 cursor-pointer"
        >
          <Funnel color="gray" />
          <span className="text-xl text-gray-600">filter</span>
        </div>
      </div>

      <div className="lg:flex lg:gap-4 mt-6">
        <div className="hidden lg:block sticky top-0 self-start">
          <Filter />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 lg:grid-cols-4 overflow-clip">
          {isLoading ? (
            // Show 10 skeletons while API loading
            Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
          ) : filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <Suspense key={product._id} fallback={<CardSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No products found matching your filters.
            </p>
          )}
        </div>
      </div>

      <PopupFilter open={openFilter} onClose={() => setOpenFilter(false)} />
    </div>
  );
}

export default AllProduct;
