import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, clearCart } from "../features/cartSlice";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { replaceAddress } from "../features/appSlice";
import axiosInstance from "../api/axios";
import { ShoppingBag, Check } from "lucide-react";
import { motion } from "motion/react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutPage from "./CheckoutPage";
import { useRef } from "react";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const checkoutRef = useRef();
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

  const [paymentOption, setPaymentOption] = useState("Online");

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please Sign Up First");
      return null; // stops rendering
    }

    if (!selectedAddress && paymentOption != "Online") {
      toast.error("Please select a delivery address before placing order");
      return;
    }
    if (products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (paymentOption === "Online") {
      setOpenCheckout(true);
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
        address: selectedAddress._id,
        paymentType: paymentOption,
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");
        // Clear entire cart after order
        dispatch(clearCart());
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Order failed"
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (checkoutRef.current && !checkoutRef.current.contains(e.target)) {
        setOpenCheckout(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        <div className="container mx-auto flex flex-col md:flex-row -py-16 mt-12">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart{" "}
              <span className="text-[18px] text-primary-dull ml-5 bg-primary/20 py-2 px-10 rounded-lg ">
                {quantity} Items
              </span>
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

              <div className="flex flex-col mt-2 gap-2">
                {/* Online Payment */}
                <div
                  onClick={() => setPaymentOption("Online")}
                  className={`flex items-center space-x-3 cursor-pointer select-none p-2 rounded 
          ${
            paymentOption === "Online" ? "bg-primary/20" : "bg-gray-100"
          } hover:bg-primary/30 transition`}
                >
                  <div
                    className={`h-5 w-5 flex items-center justify-center border-2 rounded
            ${
              paymentOption === "Online"
                ? "bg-primary border-primary"
                : "border-gray-300"
            }`}
                  >
                    {paymentOption === "Online" && (
                      <Check size={14} color="white" />
                    )}
                  </div>
                  <span>Online Payment</span>
                </div>

                {/* Cash On Delivery */}
                <div
                  onClick={() => setPaymentOption("COD")}
                  className={`flex items-center space-x-3 cursor-pointer select-none p-2 rounded
          ${
            paymentOption === "COD" ? "bg-primary/20" : "bg-gray-100"
          } hover:bg-primary/30 transition`}
                >
                  <div
                    className={`h-5 w-5 flex items-center justify-center border-2 rounded
            ${
              paymentOption === "COD"
                ? "bg-primary border-primary"
                : "border-gray-300"
            }`}
                  >
                    {paymentOption === "COD" && (
                      <Check size={14} color="white" />
                    )}
                  </div>
                  <span>Cash On Delivery</span>
                </div>
              </div>
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
              onClick={(e) => {
                e.stopPropagation(); // prevent outside close
                handlePlaceOrder();
              }}
              className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
      {openCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0  bg-black/40 backdrop-blur-md"
            onClick={() => setOpenCheckout(false)}
          />
          <div
            ref={checkoutRef}
            className="relative z-50 w-[95%] md:w-[30%] bg-white rounded-lg max-h-[90vh] overflow-y-auto shadow-lg p-4"
          >
            <CheckoutPage
              amount={Math.round((totalPrice + tax) * 100)}
              currency="usd"
              paymentType={paymentOption}
              userId={user?._id}
              items={products.map((product) => ({
                product: product.productId,
                quantity: product.quantity,
              }))}
              address={selectedAddress?._id}
              onSuccess={() => {
                setOpenCheckout(false);
                dispatch(clearCart());
                navigate("/payment-success");
              }}
              onError={() => {
                navigate("/payment-failure");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
