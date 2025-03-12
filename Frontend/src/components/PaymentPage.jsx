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
  const [cardholderName, setCardholderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !selectedPart || !cardholderName) {
      setErrorMessage("Please fill in all payment details.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const paymentData = {
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryDate,
      cvv,
      cardholderName,
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
        setTimeout(() => navigate("/spare-parts"), 3000);
      } else {
        setErrorMessage(data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error processing payment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Professional Success Popup
  const showSuccessPopup = () => {
    const popup = document.createElement("div");
    popup.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    popup.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p class="text-gray-600 mb-4">Thank you for shopping with MechKonnect. Your order has been confirmed.</p>
        <p class="text-sm text-gray-500 mb-6">You will be redirected shortly...</p>
        <button onclick="document.body.removeChild(this.parentElement.parentElement)" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(popup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-blue-400">MechKonnect</span> Checkout
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-16 bg-blue-500 rounded"></div>
            <div className="text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="h-1 w-16 bg-blue-500 rounded"></div>
          </div>
          <p className="text-gray-300 max-w-lg mx-auto">
            Your selected part is just one step away. Complete the payment securely to finalize your order.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Progress Bar */}
          <div className="bg-gray-700 p-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center text-blue-400">
                <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div className="ml-2 text-sm font-medium">Selection</div>
              </div>
              <div className="h-1 w-8 bg-blue-500 mx-2"></div>
              <div className="flex items-center text-blue-400">
                <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div className="ml-2 text-sm font-medium">Payment</div>
              </div>
              <div className="h-1 w-8 bg-gray-600 mx-2"></div>
              <div className="flex items-center text-gray-500">
                <div className="rounded-full bg-gray-600 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div className="ml-2 text-sm font-medium">Confirmation</div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Product Details - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 p-6 rounded-xl shadow-inner h-full">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Summary
                  </h2>

                  {selectedPart ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                          In Stock
                        </div>
                        <img
                          src={selectedPart.imageUrl}
                          alt={selectedPart.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-blue-300">
                        {selectedPart.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{selectedPart.description}</p>
                      
                      <div className="border-t border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Subtotal:</span>
                          <span className="text-white">${selectedPart.price}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Shipping:</span>
                          <span className="text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between font-bold mt-2 text-lg">
                          <span>Total:</span>
                          <span className="text-green-400">${selectedPart.price}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <p className="text-gray-400">No item selected.</p>
                      <button 
                        onClick={() => navigate("/spare-parts")}
                        className="mt-4 px-4 py-2 bg-blue-600 rounded-md text-sm hover:bg-blue-700 transition duration-300"
                      >
                        Select a Part
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Section - 3 columns */}
              <div className="lg:col-span-3">
                <div className="bg-gray-900 p-6 rounded-xl shadow-inner">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Information
                  </h2>

                  {errorMessage && (
                    <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-4 flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-blue-300">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="John Smith"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-blue-300">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <div className="flex space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-gray-400">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="currentColor"/>
                              <path d="M11.2 8.4l-2.9 2.9 2.9 2.9.8-.8-2.1-2.1 2.1-2.1-.8-.8z" fill="currentColor"/>
                              <path d="M12.8 8.4l-.8.8 2.1 2.1-2.1 2.1.8.8 2.9-2.9-2.9-2.9z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-blue-300">Expiration Date</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, "");
                            if (value.length <= 4) {
                              if (value.length > 2) {
                                setExpiryDate(value.slice(0, 2) + "/" + value.slice(2));
                              } else {
                                setExpiryDate(value);
                              }
                            }
                          }}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-blue-300">CVV</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            maxLength={3}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" title="3-digit security code on the back of your card">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="saveCard" className="h-4 w-4 text-blue-600 rounded border-gray-700 focus:ring-blue-500 bg-gray-700" />
                      <label htmlFor="saveCard" className="ml-2 text-sm text-gray-300">Save card for future purchases</label>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isLoading}
                      className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center ${
                        isLoading ? "bg-blue-800 cursor-not-allowed" : "hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">Pay ${selectedPart?.price || "0.00"}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-gray-900/50 p-4 border-t border-gray-700">
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Payment is secured with SSL encryption</span>
              <span className="mx-2">•</span>
              <span>We don't store your card details</span>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-gray-400 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Fast Delivery
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Money-Back Guarantee
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;