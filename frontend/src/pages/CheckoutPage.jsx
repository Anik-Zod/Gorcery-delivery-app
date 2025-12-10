import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../config/stripe";
import CheckoutForm from "../components/checkout/CheckoutForm";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function CheckoutPage({
  amount,
  currency,
  paymentType,
  userId,
  items,
  address,
  onSuccess, // optional callback that parent can provide to handle post-order actions
}) {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.app);
  
  useEffect(() => {
    if (!user?.email || !amount) return;
    const createIntent = async () => {
      try {
        const res = await axiosInstance.post("/stripe/create-payment-intent", {
          userId: user._id,
          amount: amount,
          currency: currency,
          customer_email: user.email,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Stripe API error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [user?.email, amount, currency]);

  if (loading) return <div>Loading payment...</div>;
  if (!clientSecret) return <div>Failed to initialize payment</div>;

  const appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorPrimary: "#15803d", // Tailwind green-700
      colorBackground: "#ffffff",
      colorText: "#0f172a", // slate-900
      colorDanger: "#dc2626", // red-600
      borderRadius: "8px",
      spacingUnit: "6px",
      fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    rules: {
      ".Block": {
        boxShadow: "none",
        border: "1px solid #e6e9ef",
        background: "#fff",
      },
      ".Input": {
        padding: "12px 14px",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Complete your payment
            </h3>
            <p className="text-sm text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-semibold text-slate-900">
              {amount
                ? `${currency?.toUpperCase()} ${(amount / 100).toFixed(2)}`
                : "-"}
            </p>
          </div>
        </div>
        <CheckoutForm
          amount={amount}
          currency={currency}
          paymentType={paymentType}
          userId={userId}
          items={items}
          address={address}
          onSuccess={() => {
             onSuccess();
          }}
        />
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => (onClose ? onClose() : navigate(-1))}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <p className="text-sm text-gray-400">Secured by Stripe</p>
        </div>
      </div>
    </Elements>
  );
}
