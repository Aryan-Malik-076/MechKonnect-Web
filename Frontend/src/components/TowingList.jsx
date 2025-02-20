import React from "react";

const TowingList = ({ towingTrucks }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white mt-6">
      <h2 className="text-xl font-bold mb-4">Available Towing Trucks</h2>
      <ul>
        {towingTrucks.map((truck) => (
          <li key={truck.id} className="mb-2">
            � {truck.name} - {truck.availability ? "✅ Available" : "❌ Busy"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TowingList;