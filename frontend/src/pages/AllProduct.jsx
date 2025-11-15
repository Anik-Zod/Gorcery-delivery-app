import { useDispatch, useSelector } from "react-redux";
// Lazy load the ProductCard
import { lazy, Suspense, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import Filter from "../components/Filter";
import { Funnel, X } from "lucide-react";
import PopupFilter from "../components/PopupFilter";
import { clearCategory,clearPrice } from "../features/productSlice";


const ProductCard = lazy(() => import("../components/ProductCard"));

function AllProduct() {
    const dispatch = useDispatch();

  const { data: products, isLoading, isError, error } = useFetch(
    "products",
    "/product/list"
  );

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
    const filtered = products.filter((product) => {
      // 1. Text search
      const matchesSearch =
        debouncedText.length === 0 ||
        product.name.toLowerCase().includes(debouncedText.toLowerCase());

      // 2. Category filter
      const matchesCategory =
        categories.length === 0 ||
        categories.some(
          (cat) => cat.toLowerCase() === product.category.toLowerCase()
        );

      // 3. Price filter
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      // 4. Must be in stock
      const inStock = product.inStock;

      return matchesSearch && matchesCategory && matchesPrice && inStock;
    });

    setFilterProducts(filtered);
  }, [products, debouncedText, categories, priceRange]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error}</h1>;

  return (
    <div className=" lg:px-24 px-5 md:px-10 mt-10 mx-auto relative">
      <div className="flex border justify-between gap-10 border-black/10 py-4 border-x-0">
      <div className="flex  lg:space-x-30 md:space-x-10 justify-between">
        <div className="flex flex-col w-full">
          <p className="text-2xl font-medium uppercase">All Products</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
        <div className="flex gap-4">
          
        {categories.length>0 && <div onClick={() => dispatch(clearCategory())} className="md:flex bg-primary/40 justify-center items-center py-2 px-4 rounded-xl hidden text-primary-dull cursor-pointer hover:rotate-4"><span><X/></span>Category</div>}
        { priceRange.min>0 && priceRange.max<1000 && <div onClick={() => dispatch(clearPrice())} className="md:flex bg-primary/40 justify-center items-center py-2 px-4 rounded-xl hidden text-primary-dull cursor-pointer hover:rotate-4"><span><X/></span>Price</div>}
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

      <div className="lg:flex lg:gap-6 mt-6">
        <div className="hidden lg:block sticky top-0 self-start">
          <Filter />
        </div>
        <Suspense fallback={<h1 className="animate-spin">...</h1>}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 overflow-y-auto">
            {filterProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </Suspense>
      </div>

      <PopupFilter open={openFilter} onClose={() => setOpenFilter(false)} />
    </div>
  );
}

export default AllProduct;
