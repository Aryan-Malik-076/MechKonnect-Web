import React, { useState } from "react";
import { Check, LoaderCircle, Key, X } from "lucide-react";

const SmartKeyPage = () => {
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo({ ...vehicleInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <Key className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Smart Key Request
        </h1>
        
        <p className="text-center text-gray-500 mb-8">
          Enter your vehicle details to request a new smart key
        </p>
        
        {showSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Request Submitted!</h3>
              <p className="text-green-600 text-sm">We've received your smart key request.</p>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="ml-auto p-1 rounded-full hover:bg-green-100"
            >
              <X className="h-4 w-4 text-green-600" />
            </button>
          </div>
        ) : null}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                name="make"
                value={vehicleInfo.make}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. Toyota"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={vehicleInfo.model}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. Corolla"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={vehicleInfo.year}
                onChange={handleChange}
                min="1900"
                max="2030"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. 2023"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VIN
              </label>
              <input
                type="text"
                name="vin"
                value={vehicleInfo.vin}
                onChange={handleChange}
                maxLength="17"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. 1HGBH41JXMN109186"
                required
              />
              <p className="mt-1 text-xs text-gray-500">17-character Vehicle Identification Number</p>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default SmartKeyPage;