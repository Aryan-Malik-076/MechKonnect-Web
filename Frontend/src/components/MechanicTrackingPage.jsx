import React from "react";
import { ArrowLeft, Clock } from "lucide-react";

const MechanicTrackingPage = ({ selectedMechanic, onBack, setStartTracking }) => {
  const handleStartTracking = () => {
    console.log("Tracking confirmed"); // Debug
    setStartTracking(true);
    onBack(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex items-center">
          <button onClick={() => onBack(false)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Track Mechanic</h1>
        </div>
      </header>

      <div className="flex-1 px-6 py-6">
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
              <h2 className="font-bold text-gray-800">{selectedMechanic?.name || "Unknown Mechanic"}</h2>
              <div className="flex items-center text-gray-600 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>Est. arrival: 15-20 min</span>
                <span className="mx-1">•</span>
                <span>{selectedMechanic?.distance || "1.2 km"} away</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartTracking}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium flex items-center justify-center transition-colors"
        >
          Confirm Tracking
        </button>
      </div>
    </div>
  );
};

export default MechanicTrackingPage;