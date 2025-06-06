import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ part, isWorkshop = false, serviceName, onBuyNowClick, isHomePage }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        if (isHomePage) {
          if (isWorkshop) {
            navigate("/workshop"); // Navigate to workshop page when clicking workshop card on Home Page
          } else {
            navigate("/spare-parts"); // Navigate to spare parts page when clicking spare part card on Home Page
          }
        }
      }}
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src={part.imageUrl} 
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
              e.stopPropagation(); // Prevents card click event from firing
              if (!isWorkshop && onBuyNowClick) {
                onBuyNowClick(part); // Buy Now functionality for spare parts
              } else if (isWorkshop) {
                navigate("/AppointmentsPage"); // Navigate to appointment page for workshops
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
