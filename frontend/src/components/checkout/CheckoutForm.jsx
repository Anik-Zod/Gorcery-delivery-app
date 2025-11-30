import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

export default function CheckoutForm({ amount, currency, items, address, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: undefined, // do NOT redirect, handle result manually
        },
        redirect: "if_required",
      });

      if (error) {
        console.warn("Payment confirmation error:", error);
        setErrorMessage(error.message || "Payment failed");
        return;
      }

      // Payment succeeded
      if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          await axiosInstance.post("/order/online", {
            items,
            address,
            paymentIntentId: paymentIntent.id,
            amount,
          });

          toast.success("Payment successful & order placed!");
          onSuccess();
        } catch (err) {
          console.error("Failed to save order:", err);
          toast.error("Payment succeeded but order was not saved");
        }
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setErrorMessage(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <div className="rounded-md border border-gray-200 p-4 bg-gray-50 min-h-[120px] sm:min-h-[150px] box-border">
        <PaymentElement id="payment-element" />
      </div>

      {amount && (
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="text-lg font-semibold text-slate-900">
              {currency?.toUpperCase()} {(amount / 100).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="text-sm text-red-600 mt-2">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className={`w-full py-3 px-6 rounded-md text-white font-semibold text-lg transition ${
          loading
            ? "opacity-70 cursor-wait"
            : "bg-green-700 hover:bg-green-800"
        } sticky bottom-4`}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>{" "}
            Processing
          </span>
        ) : (
          <span>
            Pay {currency?.toUpperCase()} {(amount / 100).toFixed(2)}
          </span>
        )}
      </button>
    </form>
  );
}
