import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import MapComponent from "./MapComponent";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl font-bold italic underline mb-6 text-center">
          Mobile Workshop Service
        </h1>
        <p className="text-center mb-8 text-lg">
          Get a mobile workshop to your location.
        </p>
        
        {/* Map Component */}
        <MapComponent setSelectedMechanic={setSelectedMechanic} />

        {/* Mechanic Info Card */}
        {selectedMechanic && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{selectedMechanic.name}</h2>
            <p className="text-sm text-gray-600">{selectedMechanic.description}</p>
            <p className="text-sm">⭐ {selectedMechanic.recommendations} Rating</p>
            <p className="text-lg font-semibold">Initial Charge: 300 PKR</p>
            <button
              onClick={() => console.log("Tracking Started")}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Confirm & Start Tracking
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileWorkshopPage;
