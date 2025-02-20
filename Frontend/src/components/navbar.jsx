// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-gray-800 p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/Home">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_1iTRinc7ejZLkHzvidWR9ck1xHso99e-A&s"
            alt="MechKonnect Logo"
            className="h-10 w-10 mr-2"
          />
        </Link>
        <Link to="/Home" className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300 cursor-pointer">
          MechKonnect
        </Link>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex space-x-6">
          <li>
            <Link to="/Home" className="text-white hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/workshop" className="text-white hover:text-blue-400 transition duration-300">
              Workshops
            </Link>
          </li>
          <li>
            <Link to="/Request" className="text-white hover:text-blue-400 transition duration-300">
              Requests
            </Link>
          </li>
          <li>
            <Link to="/spare-parts" className="text-white hover:text-blue-400 transition duration-300">
              Spare Parts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;