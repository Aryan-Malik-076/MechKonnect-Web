// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-gray-800 p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_1iTRinc7ejZLkHzvidWR9ck1xHso99e-A&s"
          alt="MechKonnect Logo"
          className="h-10 w-10 mr-2"
        />
        <a className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300 cursor-pointer">
          MechKonnect
        </a>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex space-x-6">
          <li>
            <a className="text-white hover:text-blue-400 transition duration-300" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="text-white hover:text-blue-400 transition duration-300" href="#workshops">
              Workshops
            </a>
          </li>
          <li>
            <a className="text-white hover:text-blue-400 transition duration-300" href="#requests">
              Requests
            </a>
          </li>
          <li>
            <a className="text-white hover:text-blue-400 transition duration-300" href="#spare-parts">
              Spare Parts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;