import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MechanicTrackingPage from "./MechanicTrackingPage";
import { MapPin, ArrowRight, X, Clock, Compass, Shield, Star, Wrench, Phone, Calendar, CreditCard, CheckCircle } from "lucide-react";
import axios from "axios";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [startTracking, setStartTracking] = useState(false);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
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
      setShowBillPopup(true);
    }, 1000);
  };

  const handleConfirmBill = () => {
    setShowBillPopup(false);
    setTimeout(() => {
      setShowPaymentPopup(true);
    }, 300);
  };

  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!paymentDetails.name.trim()) {
      setPaymentError("Please enter the cardholder name");
      return false;
    }
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
          cardNumber: `**** **** **** ${paymentDetails.cardNumber.slice(-4)}`,
        },
      });
      setShowPaymentPopup(false);
      setPaymentDetails({ cardNumber: "", expiryDate: "", cvv: "", name: "" });
      setShowThankYouPopup(true);
      
      // Instead of navigating away, we'll just show the thank you popup
      // and reset the state after a delay
      setTimeout(() => {
        setShowThankYouPopup(false);
        setStartTracking(false);
        setSelectedMechanic(null);
      }, 5000);
    } catch (error) {
      console.error("Mechanic payment error:", error);
      setPaymentError("Failed to process payment. Please try again.");
    }
  };

  const formatCardNumber = (value) => {
    // Format the card number with spaces for better readability
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
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
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2 h-6 w-6" />
            MecKonnect
          </h1>
          <div className="flex items-center space-x-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center">
              <span>Filter</span>
            </button>
            <button className="bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm">
              Help
            </button>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-1 pl-8">Mobile Workshop</p>
      </header>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-96px)]">
        <MapComponent
          setSelectedMechanic={handleMechanicSelect}
          startTracking={startTracking}
          selectedMechanic={selectedMechanic}
          onWorkComplete={handleWorkComplete}
        />

        {/* Location Badge */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-xl px-5 py-3 rounded-full flex items-center space-x-2 text-sm border border-gray-100 z-10">
          <div className="bg-blue-600 rounded-full p-1.5">
            <Compass className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-gray-800">Your Current Location</span>
        </div>
      </div>

      {/* Mechanic Details Slide-up Sheet */}
      {selectedMechanic && !startTracking && (
        <div
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
            showDetails ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "80vh", overflowY: "auto", zIndex: 1000 }}
        >
          <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-white z-10">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full"></div>
          </div>

          <button
            onClick={closeDetails}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="px-6 pb-24">
            {/* Mechanic Profile */}
            <div className="flex items-start gap-5 mb-6 mt-4">
              <div className="bg-blue-100 rounded-full p-2 border-4 border-blue-50">
                <img
                  src={selectedMechanic.image || "/api/placeholder/80/80"}
                  alt={selectedMechanic.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{selectedMechanic.name}</h2>
                <div className="flex items-center text-yellow-500 mt-1">
                  <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-100 stroke-yellow-500" />
                  <span className="ml-2 text-gray-700 text-sm">(124 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <div className="flex items-center mr-3">
                    <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                    <span>15-20 min</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                    <span>1.2 km away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">SPECIALTIES</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Engine Repair
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Electrical
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Brake Systems
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  Tire Change
                </span>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Wrench className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Fully Equipped</h4>
                  <p className="text-sm text-gray-600">Mobile workshop with professional tools</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Certified Professional</h4>
                  <p className="text-sm text-gray-600">Licensed and insured mechanic</p>
                </div>
              </div>
            </div>

            {/* Start Tracking Button */}
            <div className="mt-6">
              <button
                onClick={handleStartTracking}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center transition-colors shadow-md"
              >
                Start Tracking
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Available Mechanics Badge */}
      {!selectedMechanic && !startTracking && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl px-5 py-3 rounded-full flex items-center gap-3 border border-gray-100 z-10">
          <div className="bg-green-500 p-2 rounded-full">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-800">10 mechanics available nearby</span>
            <p className="text-xs text-gray-500">Tap on a pin to select a mechanic</p>
          </div>
        </div>
      )}

      {/* Bill Confirmation Modal */}
      {showBillPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Service Complete</h2>
              <button 
                onClick={() => setShowBillPopup(false)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">Work Completed</h3>
              </div>
              <p className="text-gray-600 pl-7">Your vehicle is now repaired and ready to go!</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">SERVICE DETAILS</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Repair Description</h4>
                <p className="text-sm text-gray-600">
                  Replaced faulty alternator and repaired electrical connections. 
                  Tested battery output and charging system.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Parts & Labor</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Alternator replacement</span>
                  <span className="font-medium text-gray-800">$35.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Electrical repair</span>
                  <span className="font-medium text-gray-800">$10.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">System testing</span>
                  <span className="font-medium text-gray-800">$5.00</span>
                </div>
                <div className="flex justify-between font-medium text-gray-800 pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>$50.00</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-6">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm text-blue-700">30-Day Service Guarantee</span>
              </div>
              <span className="text-xs text-blue-600 underline">Details</span>
            </div>
            
            <button
              onClick={handleConfirmBill}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-colors shadow-md flex items-center justify-center"
            >
              Proceed to Payment
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
              <button 
                onClick={() => setShowPaymentPopup(false)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-blue-700 mr-3" />
                <span className="text-blue-800 font-medium">Total Amount</span>
              </div>
              <span className="text-xl font-bold text-blue-800">$50.00</span>
            </div>
            
            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {paymentError}
              </div>
            )}
            
            <form onSubmit={handlePaymentSubmit} className="text-left">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={paymentDetails.name}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber ? formatCardNumber(paymentDetails.cardNumber) : ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setPaymentDetails({ ...paymentDetails, cardNumber: value });
                  }}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^\d/]/g, "");
                      if (value.length === 2 && !value.includes("/") && paymentDetails.expiryDate.length === 1) {
                        value += "/";
                      }
                      setPaymentDetails({ ...paymentDetails, expiryDate: value });
                    }}
                    maxLength="5"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setPaymentDetails({ ...paymentDetails, cvv: value });
                    }}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mb-6 flex items-center">
                <Shield className="h-3 w-3 mr-1 text-gray-400" />
                Your payment information is encrypted and secure
              </p>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-colors shadow-md flex items-center justify-center"
              >
                Complete Payment
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Modal - Enhanced version that stays on the same page */}
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 scale-100">
            <div className="rounded-full bg-green-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-4 text-lg">Your payment has been processed successfully.</p>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-700">A receipt has been sent to your email</p>
              <p className="font-medium text-blue-800 mt-1">Thanks for choosing MecKonnect</p>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
              <h3 className="font-medium text-green-800 mb-2">Service Completed</h3>
              <p className="text-sm text-green-700">
                Your vehicle repair has been completed successfully. We hope you're satisfied with our service!
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-3">How would you rate your experience?</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-yellow-400 hover:text-yellow-500 focus:outline-none">
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowThankYouPopup(false);
                setStartTracking(false);
                setSelectedMechanic(null);
              }}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-colors shadow-md"
            >
              Return to Home
            </button>
            
            <div className="flex justify-center mt-6">
              <div className="animate-pulse bg-blue-100 w-16 h-1 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshopPage;