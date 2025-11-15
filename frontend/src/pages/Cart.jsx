import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems } from "../features/cartSlice";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { replaceAddress } from "../features/appSlice";
import axiosInstance from "../api/axios";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.cart);
  const addresses = useSelector((state) => state.app.address); // get addresses from Redux
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!user?._id) return;
      try {
        const addressResponse = await axiosInstance.get(
          `/address/get/${user._id}`
        );
        dispatch(replaceAddress(addressResponse.data.addresses));
        localStorage.setItem(
          "addresses",
          JSON.stringify(addressResponse.data.addresses)
        );
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
    fetchAddress();
  }, [dispatch, user]);

  const quantity = products.length;
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const tax = totalPrice * 0.02; // 2% tax

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0] : null
  );

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const [paymentOption, setPaymentOption] = useState("COD");

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address before placing order");
      return;
    }
    if (products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const itemsToSend = products.map((product) => ({
      product: product.productId,
      quantity: product.quantity,
    }));

    try {
      const res = await axiosInstance.post("/order/cod", {
        userId: user._id,
        items: itemsToSend,
        address: selectedAddress,
        paymentType: paymentOption,
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");
        // Clear entire cart after order
        dispatch(removeCartItems({ productId: null, clearAll: true }));
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Order failed"
      );
    }
  };

  return (
    <div>
      {products.length > 0 ? (
        <div className="container mx-auto flex flex-col md:flex-row -py-16 mt-12">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-primary">{quantity} Items</span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={product.image[0]}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {product.name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <p>
                        Weight: <span>{product.weight || "N/A"}</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <span className="text-primary ml-1">
                          {product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() =>
                    dispatch(removeCartItems({ productId: product.productId }))
                  }
                  className="cursor-pointer mx-auto"
                >
                  <img
                    src={assets.remove_icon}
                    alt="remove"
                    className="inline-block w-6 h-6"
                  />
                </button>
              </div>
            ))}

            <button
              onClick={() => navigate("/products")}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
            >
              <img
                src={assets.arrow_right_icon_colored}
                alt=""
                className="group-hover:-translate-x-1 transition"
              />
              Continue Shopping
            </button>
          </div>

          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2">
                <p className="text-gray-500 max-w-[70%] truncate">
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                    : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 max-h-48 overflow-auto">
                    {addresses.length > 0 ? (
                      addresses.map((address, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setSelectedAddress(address);
                            setShowAddress(false);
                          }}
                          className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer truncate"
                        >
                          {address.street}, {address.city}, {address.state},{" "}
                          {address.country}
                        </p>
                      ))
                    ) : (
                      <p className="p-2 text-gray-500">
                        No addresses available
                      </p>
                    )}
                    <p
                      onClick={() => {
                        setShowAddress(false);
                        navigate("/add-address");
                      }}
                      className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                    >
                      Add address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-6">
                Payment Method
              </p>

              <select
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                value={paymentOption}
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>${tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span>
                <span>${(totalPrice + tax).toFixed(2)}</span>
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="container mt-16 overflow-x-clip ">
          <div className="flex gap-2">
            <ShoppingBag /> <span> Shopping Card</span>
          </div>
          <div

            className="flex flex-col md:flex-row justify-center w-full"
          >
            <motion.img             animate={{ rotate: [-10, 10, -10] }}
            transition={{
              duration: 2, // 2 seconds per swing cycle
              repeat: Infinity, // repeat forever
              ease: "easeInOut", // smooth in and out
            }} src="Empty-Cart.png" alt="" />
            <div className="flex justify-center gap-5 flex-col max-w-xl">
              <p className=" text-3xl">Your cart is feeling lonely</p>
              <h1>It looks like you haven't added anything to your cart yet. Let's change that and find some amazing products for you!</h1>
              <NavLink to={"/products"} className="bg-primary py-2 rounded-xl px-10 max-w-60 text-white">Discover Products</NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
