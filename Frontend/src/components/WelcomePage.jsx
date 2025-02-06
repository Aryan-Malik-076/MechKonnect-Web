import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      {/* Left Side: Project Name, Description, and Buttons */}
      <div className="flex-1 max-w-2xl space-y-6">
        <h1 className="text-6xl font-bold text-blue-500">MecKonnect</h1>
        <p className="text-lg text-gray-400">
          Connecting mechanics with those in need. Your one-stop solution for reliable and professional mechanical services.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          
          <button
            onClick={() => navigate('/signup')}
            className="bg-transparent border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Right Side: Mechanic Image */}
      <div className="flex-1 flex justify-end">
        <img
          src="https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with your mechanic image URL
          alt="Mechanic"
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default WelcomePage;