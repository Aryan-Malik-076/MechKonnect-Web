import React from "react";

const Card = ({ part, isWorkshop = false, serviceName, onClick, onBuyNowClick, isHomePage }) => {
  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-100 cursor-pointer"
      onClick={isHomePage ? onClick : undefined} // Navigate for spare parts on home page
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src={part.imageUrl} // Use the correct field name
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
        <p className="text-gray-600 mb-2">{part.description}</p>

        {/* Display price only for spare parts */}
        {!isWorkshop && part.price && (
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Price: {part.price} PKR
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event from firing
              if (!isWorkshop && onBuyNowClick) {
                onBuyNowClick(part); // Trigger Buy Now popup for spare parts
              } else if (isWorkshop && onClick) {
                onClick(); // Trigger workshop navigation
              }
            }}
          >
            {serviceName || (isWorkshop ? "Appointment" : "Buy Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;