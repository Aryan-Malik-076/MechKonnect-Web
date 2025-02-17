// MobileWorkshopPage.js
import React from "react";
import NavBar from "./Navbar";

const MobileWorkshopPage = () => {
  return (
    <>
      <NavBar /> {/* Include the NavBar for navigation */}
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl font-bold italic underline mb-6 text-center">
          Mobile Workshop Service
        </h1>
        <p className="text-center mb-8 text-lg">
          Get a mobile workshop to your location.
        </p>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Mobile Workshop Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-center mt-8 text-lg">
          Our mobile workshop will come to your location and provide on-the-spot
          repairs.
        </p>
      </div>
    </>
  );
};

export default MobileWorkshopPage;