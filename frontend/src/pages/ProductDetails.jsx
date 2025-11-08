import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { addCartItems } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState();

  const { id } = useParams();


  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useFetch("detail", `/product/${id}`);


  const {
    data: sugesstionProducts = [],
    isLoading: relatedLoading,
    isError: relatedError,
  } = useFetch(
    "category",
    product?.category ? `/product/list/${product.category}` : null
  );

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  const handleAddTOCart = () => {
    dispatch(
      addCartItems({
        productId: product._id,
        name: product.name,
        price: product.offerPrice,
        image: product.image,
      })
    );
  };

  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if(!product) return;
    
    const productArray = Array.isArray(sugesstionProducts)?sugesstionProducts:[];

    const filteredProducts = productArray.filter((item)=>item._id !== product._id);
    
    setRelatedProducts(filteredProducts);
  }, [sugesstionProducts, product]);


  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>{error}</h1>;

  return (
    product && (
      <div className="mt-16">
        <p>
          <Link className="cursor-pointer hover:text-primary" to={"/"}>
            Home
          </Link>{" "}
          /{" "}
          <Link className="cursor-pointer hover:text-primary" to={"/products"}>
            Products
          </Link>{" "}
          /
          <Link
            className="cursor-pointer hover:text-primary"
            to={`/products/${product.category.toLowerCase()}`}
          >
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    className="md:w-4 w-3.5"
                    src={i > 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                  />
                ))}
              <p className="text-base ml-2">({4})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={handleAddTOCart}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddTOCart();
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* related products */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max ">
            <p className="text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate(`/products`), scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
          >
            See more ...
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
