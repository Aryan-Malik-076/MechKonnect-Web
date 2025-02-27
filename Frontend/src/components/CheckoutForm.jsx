import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";

const CheckoutForm = ({ onSuccessfulPayment, userId, mechanicId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError("");

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet.");
            setProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, token } = await stripe.createToken(cardElement);

        console.log("Generated Token:", token); // Debugging log

        if (error) {
            console.error("Stripe Error:", error);
            setError(error.message);
            setProcessing(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/payment/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token.id, // Send only token ID
                    amount: 300, // Fixed charge
                    userId,
                    mechanicId
                }),
            });

            const data = await response.json();
            console.log("Payment Response:", data); // Debugging log

            if (data.message === "Payment successful") {
                alert("Payment successful!");
                onSuccessfulPayment(); // Start tracking mechanic after payment
            } else {
                setError("Payment failed. Try again.");
            }
        } catch (err) {
            console.error("Error processing payment:", err);
            setError("An error occurred while processing payment.");
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="border p-4 rounded-md mb-4">
                    <CardElement className="p-2" />
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md"
                >
                    {processing ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : "Pay 300 PKR"}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
