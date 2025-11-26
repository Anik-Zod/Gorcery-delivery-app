import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
} from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

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
      className="border max-h-90 h-70 border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-45 max-w-56 w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
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
        <div className="flex items-end justify-between mt-3">
          <div className="md:text-xl text-base font-medium text-primary">
            <div className="flex flex-col">
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                ${product.price}
              </span>
              <span>${product.offerPrice}</span>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="text-primary relative bottom-3">
            {quantity === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary border border-primary md:w-[90px] w-[64px] h-[34px] rounded text-white cursor-pointer font-medium"
                onClick={handleAdd}
              >
                <img src={assets.cart_icon} alt="" loading="lazy" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none">
                <button
                  onClick={handleDecrement}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
