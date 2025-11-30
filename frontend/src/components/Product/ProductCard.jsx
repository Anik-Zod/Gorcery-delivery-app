import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
} from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Heart, Minus, Plus, Share2, ShoppingBag } from "lucide-react";
import {motion} from "motion/react"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const quantity =
    cart.find((item) => item.productId === product._id)?.quantity || 0;

  const handleAdd = () => {
    dispatch(
      addCartItems({
        productId: product._id,
        name: product.name,
        price: product.offerPrice,
        image: product.image,
      })
    );
  };

  const handleIncrement = () => {
    dispatch(
      updateCartItemQuantity({
        productId: product._id,
        quantity: quantity + 1,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch(removeCartItems({ productId: product._id }));
    } else {
      dispatch(
        updateCartItemQuantity({
          productId: product._id,
          quantity: quantity - 1,
        })
      );
    }
  };

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="border relative flex flex-col justify-between h-90 sm:h-95 border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white sm:min-w-[206px] max-w-64 sm:w-full group hover:shadow-xl"
    >
      <div className="flex flex-col sm:gap-4">
        <div className="group cursor-pointer flex items-end justify-center px-2 h-44 ">
          <img
            className="group-hover:scale-115 transition duration-400  "
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>

          {/* stars  */}
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3.5 w-3"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p>(4)</p>
          </div>
        </div>
        {/* price */}
        <div className="flex gap-4  w-full">
          <span className=" font-bold text-[#15AF53] text-[18px]">
            ${product.offerPrice}
          </span>
          <span className=" font-bold text-[18px] text-gray-500/60 line-through">
            ${product.price}
          </span>
          <span className="bg-[#FFE2E2] text-red-600 px-2  rounded">-10%</span>
        </div>
      </div>

      {/* add button  */}
      <div
        onClick={(e) => e.stopPropagation()}
        className=" relative bottom-3 w-full "
      >
        {quantity === 0 ? (
          <button
            className="flex items-center justify-center gap-3  border border-primary w-full h-[34px] rounded text-black  cursor-pointer font-medium"
            onClick={handleAdd}
          >
            <ShoppingBag size={20} />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center bg-gray-200/60 justify-center gap-3 w-full py-2 rounded select-none">
            <p className="text-md">Quantity</p>
            <div className="flex items-center justify-center ">
              <button
                onClick={handleDecrement}
                className="transition cursor-pointer text-3xl py-1 px-3 hover:bg-primary/50 rounded-xl h-full"
              >
                <Minus size={15} />
              </button>
              <span className="w-5 text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="transition cursor-pointer text-2xl py-1 px-3 hover:bg-primary/50 rounded-xl h-full"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 p-2">
        <p className=" px-3 rounded-lg mb-2 bg-yellow-600 text-white">Sale</p>
        <p className=" px-3 rounded-lg mb-2 bg-red-600 text-white">-10%</p>
      </div>

      <div 
      className="absolute bottom-40 right-3 flex flex-col gap-3
             opacity-0 translate-x-12
             group-hover:opacity-100 group-hover:translate-x-0
             transition-all duration-400"
      >
        <div className="py-2 px-2 bg-gray-200/80 hover:bg-primary-dull hover:text-white cursor-pointer rounded-full"><Heart size={18}/></div>
        <div className="py-2 px-2 bg-gray-200/80 hover:bg-primary-dull hover:text-white cursor-pointer rounded-full"><ArrowLeftRight size={18}/></div>
        <div className="py-2 px-2 bg-gray-200/80 hover:bg-primary-dull hover:text-white cursor-pointer rounded-full"><Share2 size={18}/></div>
      </div>
    </div>
  );
};

export default ProductCard;
