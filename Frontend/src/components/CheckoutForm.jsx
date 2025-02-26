import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Button = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
  >
    {children}
  </button>
);

const CheckoutForm = ({ onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe is not properly loaded.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Payment successful!", paymentMethod);
      onSuccessfulPayment(paymentMethod);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">💳 Enter Payment Details</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700 text-sm font-semibold">
          Card Details
          <div className="border p-3 rounded-md mt-1">
            <CardElement options={{ hidePostalCode: false }} className="w-full" />
          </div>
        </label>

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
