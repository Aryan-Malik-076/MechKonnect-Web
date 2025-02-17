// src/components/Card.jsx
import React from "react";

const Card = ({ part, isWorkshop = false, serviceName, onClick }) => {
  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-100 cursor-pointer"
      onClick={onClick} // Navigate when clicked
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src={part.image || part.imageUrl} // Ensure correct image field
          alt={part.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Header */}
      <div className="bg-gray-800 p-4">
        <h2 className="text-2xl font-bold text-white">{part.name}</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{part.description}</p>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {serviceName || (isWorkshop ? "Appointment" : "Buy Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;