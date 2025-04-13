import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MechanicTrackingPage from "./MechanicTrackingPage";
import { MapPin, ArrowRight, X, Clock, Compass } from "lucide-react";
import axios from "axios";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [startTracking, setStartTracking] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentError, setPaymentError] = useState("");

  const handleMechanicSelect = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedMechanic(null), 300);
  };

  const handleStartTracking = () => {
    setShowDetails(false);
    setShowTrackingPage(true);
  };

  const handleBackFromTracking = (trackingStarted = false) => {
    setShowTrackingPage(false);
    if (trackingStarted) {
      setStartTracking(true);
    } else {
      setSelectedMechanic(null);
      setStartTracking(false);
    }
  };

  const handleWorkComplete = () => {
    setTimeout(() => {
      setShowPaymentPopup(true);
    }, 1000);
  };

  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!cardNumberRegex.test(paymentDetails.cardNumber)) {
      setPaymentError("Card number must be 16 digits");
      return false;
    }
    if (!cvvRegex.test(paymentDetails.cvv)) {
      setPaymentError("CVV must be 3 or 4 digits");
      return false;
    }
    if (!expiryRegex.test(paymentDetails.expiryDate)) {
      setPaymentError("Expiry date must be in MM/YY format");
      return false;
    }
    return true;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentError("");

    if (!validateCardDetails()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/mechanic-payments", {
        mechanicName: selectedMechanic.name,
        userId: "user123",
        amount: 50,
        paymentMethod: "card",
        cardDetails: {
          ...paymentDetails,
          cardNumber: `**** **** **** ${paymentDetails.cardNumber.slice(-4)}`, // Mask card number
        },
      });
      setShowPaymentPopup(false);
      setPaymentDetails({ cardNumber: "", expiryDate: "", cvv: "" });
      setStartTracking(false);
      setSelectedMechanic(null);
    } catch (error) {
      console.error("Mechanic payment error:", error);
      setPaymentError("Failed to process payment. Please try again.");
    }
  };

  if (showTrackingPage) {
    return (
      <MechanicTrackingPage
        selectedMechanic={selectedMechanic}
        onBack={handleBackFromTracking}
        setStartTracking={setStartTracking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 relative">
      <header className="bg-blue-700 text-white py-4 px-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2 h-6 w-6" />
            Mobile Workshop
          </h1>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors">
              Filter
            </button>
            <button className="bg-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-900 transition-colors">
              Help
            </button>
          </div>
        </div>
      </header>

      <div className="relative h-[calc(100vh-80px)]">
        <MapComponent
          setSelectedMechanic={handleMechanicSelect}
          startTracking={startTracking}
          selectedMechanic={selectedMechanic}
          onWorkComplete={handleWorkComplete}
        />

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-2 text-sm border border-gray-100 z-10">
          <Compass className="h-5 w-5 text-blue-700" />
          <span className="font-semibold text-gray-800">Current Location</span>
        </div>
      </div>

      {selectedMechanic && !startTracking && (
        <div
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
            showDetails ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "70vh", overflowY: "auto", zIndex: 1000 }}
        >
          <div className="flex justify-center pt-3 pb-4 sticky top-0 bg-white z-10">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full"></div>
          </div>

          <button
            onClick={closeDetails}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="px-6 pb-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <img
                  src={selectedMechanic.image || "/api/placeholder/64/64"}
                  alt={selectedMechanic.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{selectedMechanic.name}</h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>15-20 min response time</span>
                  <span className="mx-2">•</span>
                  <span>1.2 km away</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleStartTracking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center transition-colors shadow-md"
              >
                Start Tracking
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedMechanic && !startTracking && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-xl px-5 py-3 flex items-center gap-2 border border-gray-100 z-10">
          <div className="bg-green-100 p-1.5 rounded-full">
            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-semibold text-gray-800">10 mechanics available nearby</span>
        </div>
      )}

      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 scale-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment</h2>
            <p className="text-gray-600 mb-6 text-lg">Total Amount: $50</p>
            {paymentError && (
              <p className="text-red-500 mb-4 text-sm">{paymentError}</p>
            )}
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    setPaymentDetails({ ...paymentDetails, cardNumber: value });
                  }}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                  className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setPaymentDetails({ ...paymentDetails, cvv: value });
                  }}
                  className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshopPage;