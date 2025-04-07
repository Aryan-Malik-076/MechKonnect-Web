import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MechanicTrackingPage from "./MechanicTrackingPage"; // Updated import
import { MapPin, ArrowRight, X, Clock, Compass } from "lucide-react";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false); // Renamed from showPaymentPage
  const [startTracking, setStartTracking] = useState(false);

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
    setShowTrackingPage(true); // Show tracking page
  };

  const handleBackFromTracking = (trackingStarted = false) => {
    setShowTrackingPage(false);
    if (trackingStarted) {
      setStartTracking(true); // Start tracking after button click
    } else {
      setSelectedMechanic(null);
      setStartTracking(false);
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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Mobile Workshop
          </h1>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Filter</button>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">Help</button>
          </div>
        </div>
      </header>

      <div className="relative h-[calc(100vh-80px)]">
        <MapComponent
          setSelectedMechanic={handleMechanicSelect}
          startTracking={startTracking}
          selectedMechanic={selectedMechanic}
        />

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-sm border border-gray-200">
          <Compass className="h-4 w-4 text-blue-600" />
          <span className="font-medium">Current Location</span>
        </div>

        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-t-lg border-b border-gray-200">+</button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-b-lg">−</button>
        </div>
      </div>

      {selectedMechanic && !startTracking && (
        <div
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out ${
            showDetails ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "70vh", overflowY: "auto", zIndex: 1000 }}
        >
          <div className="flex justify-center pt-2 pb-4 sticky top-0 bg-white z-10">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <button
            onClick={closeDetails}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
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
                <h2 className="text-xl font-bold text-gray-800">{selectedMechanic.name}</h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>15-20 min response time</span>
                  <span className="mx-2">•</span>
                  <span>1.2 km away</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleStartTracking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium flex items-center justify-center transition-colors"
              >
                Start Tracking
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedMechanic && !startTracking && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-3 flex items-center gap-2 border border-gray-200">
          <div className="bg-green-100 p-1 rounded-full">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium">10 mechanics available nearby</span>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshopPage;