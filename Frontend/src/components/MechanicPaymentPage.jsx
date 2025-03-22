import React, { useState } from "react";
import { ArrowLeft, CheckCircle, CreditCard, Clock, DollarSign, User, Phone, MapPin } from "lucide-react";

const MechanicPaymentPage = ({ selectedMechanic, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  // Handle payment submission
  const handleSubmitPayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentComplete(true);
    }, 1500);
  };

  if (isPaymentComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Payment Confirmation</h1>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your mechanic is on the way to your location. Estimated arrival time: 15-20 minutes.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-gray-700">{selectedMechanic?.name || "Ali Mechanic"}</span>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Call Now
              </button>
            </div>
            <button 
              onClick={onBack}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Confirm & Pay</h1>
        </div>
      </header>

      {/* Payment Details */}
      <div className="flex-1 px-6 py-6">
        {/* Mechanic Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <img 
                src={selectedMechanic?.image || "/api/placeholder/48/48"} 
                alt={selectedMechanic?.name || "Mechanic"}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{selectedMechanic?.name || "Ali Mechanic"}</h2>
              <div className="flex items-center text-gray-600 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>Est. arrival: 15-20 min</span>
                <span className="mx-1">•</span>
                <span>{selectedMechanic?.distance || "1.2 km"} away</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Service Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Service Location</p>
                <p className="text-gray-600 text-sm">Your current location</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Mechanic</p>
                <p className="text-gray-600 text-sm">{selectedMechanic?.description || "Professional mechanic with tools for on-site diagnosis and repair."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment</h3>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Initial Service Fee</span>
            <span className="font-medium">33 PKR</span>
          </div>
          
          <div className="py-3 text-sm text-gray-500">
            * This is only the initial fee. Additional charges may apply based on diagnosis and repairs needed.
          </div>
          
          {/* Payment Method Selection */}
          <div className="mt-3">
            <p className="font-medium text-gray-700 mb-2">Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className={`border rounded-lg p-3 flex items-center justify-center ${
                  paymentMethod === "card" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className={`h-5 w-5 mr-2 ${paymentMethod === "card" ? "text-blue-600" : "text-gray-500"}`} />
                <span className={paymentMethod === "card" ? "text-blue-600 font-medium" : "text-gray-600"}>Card</span>
              </button>
              
              <button 
                className={`border rounded-lg p-3 flex items-center justify-center ${
                  paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <DollarSign className={`h-5 w-5 mr-2 ${paymentMethod === "cash" ? "text-blue-600" : "text-gray-500"}`} />
                <span className={paymentMethod === "cash" ? "text-blue-600 font-medium" : "text-gray-600"}>Cash</span>
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleSubmitPayment}
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium flex items-center justify-center transition-colors ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
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
            `Pay 33 PKR & Start Tracking`
          )}
        </button>
      </div>
    </div>
  );
};

export default MechanicPaymentPage;