import React from "react";

const MechanicCard = ({ mechanic, onClose, onConfirm }) => {
  if (!mechanic) return null; // Don't render if no mechanic is selected

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      {/* Mechanic Image (Replace with actual image if available) */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
        <img
          src="https://via.placeholder.com/150" // Replace with actual image
          alt={mechanic.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Mechanic Details */}
      <h2 className="text-xl font-bold mt-2">{mechanic.name}</h2>
      <p className="text-gray-600">{mechanic.description}</p>
      
      {/* Rating & Price */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-yellow-500">⭐ {mechanic.recommendations}</span>
        <span className="text-gray-700 font-semibold">💰 {mechanic.initialCharge} PKR</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => onConfirm(mechanic)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default MechanicCard;
