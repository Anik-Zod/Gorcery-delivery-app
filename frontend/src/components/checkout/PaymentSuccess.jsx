import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";

// Custom hook to get window size
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

function PaymentSuccess() {
  const { width, height } = useWindowSize();

  return (
    <div className="flex items-center justify-center min-h-screen p-4  relative overflow-hidden">
      {/* Confetti */}
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

      <div className="flex flex-col lg:flex-row items-center bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full">
        
        {/* Illustration */}
        <div className="w-full lg:w-1/2">
          <img
            src="payment-success.png" // replace with your chosen image URL
            alt="Payment Success"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="w-full lg:w-1/2 p-10 text-center lg:text-left flex flex-col justify-center gap-6">
          {/* Animated Success Icon */}
          <CheckCircle className="text-green-500 w-20 h-20 mx-auto lg:mx-0 animate-bounce" />

          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-gray-800">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {/* Continue Button */}
          <button className="self-center lg:self-start flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
