import React from "react";

const Card = ({ part }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-100">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src={part.imageUrl} // Get from backend
          alt={part.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Header */}
      <div className="bg-gray-800 p-4">
        <h2 className="text-2xl font-bold text-white">{part.name}</h2>
        <div className="mt-2">
          {part.discount && (
            <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
              {part.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{part.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">${part.price}</span>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
