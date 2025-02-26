import React from "react";

const TowingService = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        🚗 Towing Service Available
      </h2>
      <p className="text-gray-600 text-center mb-6">
        We provide **fast and reliable** towing services in Islamabad and Attock. Get assistance anytime, anywhere!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">🚛 Standard Towing</h3>
          <p className="text-gray-600">Affordable towing for broken-down vehicles within city limits.</p>
          <p className="text-blue-600 font-bold mt-2">Price: 1500 PKR</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">🛻 Long Distance Towing</h3>
          <p className="text-gray-600">For intercity breakdowns and transportation of vehicles.</p>
          <p className="text-blue-600 font-bold mt-2">Price: 5000 PKR</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">🆘 Emergency Roadside</h3>
          <p className="text-gray-600">Get immediate assistance for flat tires, battery issues, or minor repairs.</p>
          <p className="text-blue-600 font-bold mt-2">Price: 800 PKR</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">🚜 Heavy-Duty Towing</h3>
          <p className="text-gray-600">Towing for trucks, buses, and larger vehicles.</p>
          <p className="text-blue-600 font-bold mt-2">Price: 7000 PKR</p>
        </div>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Request Towing Service
      </button>
    </div>
  );
};

export default TowingService;
