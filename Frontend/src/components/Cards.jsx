import React from 'react';

const Card = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src="https://cdn.ferrari.com/cms/network/media/img/resize/6673fe6251b1d700111f8d73-laferrari_20240627_cover_1300x730_v2" // Replace with your car image URL
          alt="Tesla Model S"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Header */}
      <div className="bg-gray-800 p-4">
        <h2 className="text-2xl font-bold text-white">Tesla Model S</h2>
        <div className="mt-2">
          <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
            25% OFF
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          Free recharge at any station
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">BASIC CONFIGURATION</h3>
          <ul className="mt-2 text-gray-600">
            <li>4 passengers</li>
            <li>100 km/h in 4 seconds</li>
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">$168.00</span>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;