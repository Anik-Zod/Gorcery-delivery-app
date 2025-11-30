import React from "react";
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from "lucide-react";

function PaymentFailed() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white px-4">

      {/* Main Card */}
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full overflow-hidden flex flex-col lg:flex-row transition-all duration-700 hover:shadow-red-200">

        {/* Illustration Section */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src="payment-failed.jpg" // your custom image
            alt="Payment Failed"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-400/10 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center gap-7">

          {/* Icon */}
          <XCircle className="w-20 h-20 text-red-500 animate-pulse" />

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Payment Power Failed 💥
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Something went wrong while processing your payment.
            <br />
            Please try again or reach out to support if the issue continues.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">

            {/* Retry */}
            <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              <RefreshCw className="group-hover:rotate-180 transition-transform duration-300" />
              Try again leter
            </button>

            {/* Support */}
            <button className="group flex items-center justify-center gap-2 border border-red-300 text-red-500 hover:bg-red-50 px-7 py-3 rounded-full transition-all duration-300">
              <HelpCircle className="group-hover:scale-110 transition-transform" />
              Contact Support
            </button>

          </div>

          {/* Go Back */}
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition mt-4">
            <ArrowLeft className="w-4 h-4" />
            Return to checkout
          </button>

        </div>
      </div>

    </div>
  );
}

export default PaymentFailed;
