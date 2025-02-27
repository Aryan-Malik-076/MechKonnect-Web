import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPart = location.state?.selectedPart;

  // State for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Handle payment submission
  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !selectedPart) {
      alert("Please fill in all payment details.");
      return;
    }

    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      productName: selectedPart.name,
      productPrice: selectedPart.price,
    };

    try {
      const response = await fetch("http://localhost:5000/api/payments/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.success) {
        showSuccessPopup();
        navigate("/spare-parts");
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (error) {
      alert("Error processing payment.");
    }
  };

  // Professional Success Popup
  const showSuccessPopup = () => {
    const popup = document.createElement("div");
    popup.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
    popup.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 class="text-2xl font-bold text-green-600">Transaction Successful!</h2>
        <p class="text-gray-700 mt-2">Thank you for shopping with MechKonnect.</p>
        <button onclick="document.body.removeChild(this.parentElement.parentElement)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(popup);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Secure Checkout - MechKonnect
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Ensuring safe and seamless transactions for your convenience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            {selectedPart ? (
              <>
                <img
                  src={selectedPart.imageUrl}
                  alt={selectedPart.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-300">
                  {selectedPart.name}
                </h3>
                <p className="text-gray-300">{selectedPart.description}</p>
                <p className="text-lg font-semibold text-green-400 mt-2">
                  ${selectedPart.price}
                </p>
              </>
            ) : (
              <p className="text-gray-400">No item selected.</p>
            )}
          </div>
          {/* Payment Section */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Payment Details</h2>
            <p className="text-gray-300 mb-4">
              Enter your payment details below to complete your purchase.
            </p>
            <div className="p-4 rounded-lg bg-gray-800">
              <label className="block mb-2 font-semibold text-white">Card Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white placeholder-gray-500"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                maxLength={16}
              />
              <label className="block mb-2 font-semibold text-white">Expiration Date (MM/YY)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white placeholder-gray-500"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setExpiryDate(value.replace(/^(\d{2})(\d{0,2})$/, "$1/$2"));
                }}
                maxLength={5}
              />
              <label className="block mb-2 font-semibold text-white">CVV</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white placeholder-gray-500"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
              />
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
            >
              Confirm & Pay
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Your payment is secure and encrypted with the latest security standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;