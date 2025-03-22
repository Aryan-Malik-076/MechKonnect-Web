import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MechanicPaymentPage from "./MechanicPaymentPage";
import { MapPin, Star, Phone, MessageCircle, ArrowRight, X, DollarSign, Clock, Compass } from "lucide-react";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleMechanicSelect = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    // Optionally clear selection after animation
    setTimeout(() => setSelectedMechanic(null), 300);
  };

  const handleBookAppointment = () => {
    setShowDetails(false);
    setShowPaymentPage(true);
  };

  const handleBackFromPayment = () => {
    setShowPaymentPage(false);
    // Optionally, decide whether to show details again or clear selection
    setSelectedMechanic(null);
  };

  // If payment page is active, show that instead of the main page
  if (showPaymentPage) {
    return (
      <MechanicPaymentPage 
        selectedMechanic={selectedMechanic}
        onBack={handleBackFromPayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Mobile Workshop
          </h1>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Filter
            </button>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Help
            </button>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-80px)]">
        <MapComponent setSelectedMechanic={handleMechanicSelect} />
        
        {/* Location Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-sm border border-gray-200">
          <Compass className="h-4 w-4 text-blue-600" />
          <span className="font-medium">Current Location</span>
        </div>
        
        {/* Zoom Controls */}
        <div className="absolut\e top-4 right-4 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-t-lg border-b border-gray-200">+</button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-b-lg">−</button>
        </div>
      </div>

      {/* Mechanic Details Slide-up Panel */}
      {selectedMechanic && (
        <div 
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
            showDetails ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            zIndex: 1000
          }}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-2 pb-4 sticky top-0 bg-white z-10">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={closeDetails}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="px-6 pb-24">
            {/* Mechanic Info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <img 
                  src={selectedMechanic.image || "/api/placeholder/64/64"} 
                  alt={selectedMechanic.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{selectedMechanic.name}</h2>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-gray-700">{selectedMechanic.recommendations}</span>
                  <span className="text-gray-500 text-sm">({selectedMechanic.reviewCount || "124"} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{selectedMechanic.responseTime || "10 min"} response time</span>
                  <span className="mx-2">•</span>
                  <span>{selectedMechanic.distance || "1.2 km"} away</span>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(selectedMechanic.expertise || ["Engine Repair", "Brake Service", "Electrical"]).map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">About</h3>
              <p className="text-gray-600">
                {selectedMechanic.description || "Professional mechanic with over 10 years of experience specializing in automotive repair and maintenance. Equipped with tools for on-site diagnosis and repair of common issues."}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Pricing</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-gray-700">Initial Charge</span>
                </div>
                <span className="font-bold text-blue-700">300 PKR</span>
              </div>
              <div className="text-sm text-gray-500">
                *Additional charges may apply based on repairs needed
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium flex items-center justify-center transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </button>
              <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-medium flex items-center justify-center transition-colors">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </button>
            </div>

            {/* Book Appointment */}
            <div className="mt-6">
              <button 
                onClick={handleBookAppointment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium flex items-center justify-center transition-colors"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Info Bar (when no mechanic is selected) */}
      {!selectedMechanic && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-3 flex items-center gap-2 border border-gray-200">
          <div className="bg-green-100 p-1 rounded-full">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium">12 mechanics available nearby</span>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshopPage;