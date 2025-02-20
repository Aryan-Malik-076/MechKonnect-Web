// src/components/MechanicCard.jsx
import React from "react";

const MechanicCard = ({ mechanic, onClose, onConfirm }) => {
  if (!mechanic) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="max-w-md bg-white rounded-lg shadow-2xl overflow-hidden transform transition duration-300 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          ✕
        </button>

        {/* Image Section */}
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <img
            src={mechanic.image || "/placeholder.png"} // Default image
            alt={mechanic.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Header */}
        <div className="bg-gray-800 p-4">
          <h2 className="text-2xl font-bold text-white">{mechanic.name}</h2>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">{mechanic.description}</p>
          <p className="text-lg font-semibold">⭐ {mechanic.recommendations} Rating</p>
          <p className="text-lg font-semibold">Initial Charge: 300 PKR</p>

          {/* Confirm Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={onConfirm}
            >
              Confirm & Start Tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicCard;
