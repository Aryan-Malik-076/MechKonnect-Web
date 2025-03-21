import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Users, Phone, FileText, Shield, ChevronRight, ChevronLeft } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-900 to-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sidebar Toggle Button (Icon Only) */}
            <button 
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Logo and Brand Name */}
            <div className="flex items-center">
              <Link to="/Home" className="flex items-center">
                <div className="h-10 w-10 mr-2 bg-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white tracking-wide">
                  Mech<span className="text-blue-400">Konnect</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link to="/Home" className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium transition duration-300">
                  Home
                </Link>
                <Link to="/workshop" className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium transition duration-300">
                  Workshops
                </Link>
                <Link to="/Request" className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium transition duration-300">
                  Requests
                </Link>
                <Link to="/spare-parts" className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium transition duration-300">
                  Spare Parts
                </Link>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300">
                  Connect Now
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <Link
                to="/Home"
                className="text-gray-200 hover:text-blue-400 block px-3 py-2 rounded-md font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/workshop"
                className="text-gray-200 hover:text-blue-400 block px-3 py-2 rounded-md font-medium"
                onClick={toggleMenu}
              >
                Workshops
              </Link>
              <Link
                to="/Request"
                className="text-gray-200 hover:text-blue-400 block px-3 py-2 rounded-md font-medium"
                onClick={toggleMenu}
              >
                Requests
              </Link>
              <Link
                to="/spare-parts"
                className="text-gray-200 hover:text-blue-400 block px-3 py-2 rounded-md font-medium"
                onClick={toggleMenu}
              >
                Spare Parts
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium w-full mt-2">
                Connect Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Left Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-800 w-64 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">MechKonnect</h2>
          <button 
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="py-4">
          <Link
            to="/Home"
            className="text-gray-200 hover:bg-gray-700 hover:text-blue-400 flex items-center px-4 py-3 transition duration-300"
            onClick={toggleSidebar}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-200 hover:bg-gray-700 hover:text-blue-400 flex items-center px-4 py-3 transition duration-300"
            onClick={toggleSidebar}
          >
            <Users className="h-5 w-5 mr-3" />
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 hover:bg-gray-700 hover:text-blue-400 flex items-center px-4 py-3 transition duration-300"
            onClick={toggleSidebar}
          >
            <Phone className="h-5 w-5 mr-3" />
            Contact
          </Link>
          <Link
            to="/ReturnPolicy"
            className="text-gray-200 hover:bg-gray-700 hover:text-blue-400 flex items-center px-4 py-3 transition duration-300"
            onClick={toggleSidebar}
          >
            <FileText className="h-5 w-5 mr-3" />
            Return Policy
          </Link>
          <Link
            to="/PirvacyPolicy"
            className="text-gray-200 hover:bg-gray-700 hover:text-blue-400 flex items-center px-4 py-3 transition duration-300"
            onClick={toggleSidebar}
          >
            <Shield className="h-5 w-5 mr-3" />
            Privacy Policy
          </Link>
        </div>
        
        {/* Optional: Additional sidebar footer content */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            &copy; 2025 MechKonnect
          </div>
        </div>
      </div>
      
      {/* Sidebar Toggle Button (fixed to edge when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md shadow-lg z-40 transition-all duration-300"
          aria-label="Open sidebar"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;