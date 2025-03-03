import React from "react";
import Navbar from "./navbar";
import UpliftingMap from "../components/UpliftingMap"; // Import UpliftingMap

const UpliftingPage = () => (
  <div className="min-h-screen bg-black text-white p-6">
    <Navbar />
    <h1 className="text-4xl font-bold italic underline mb-6 text-center">
      Uplifting Service
    </h1>
    <p className="text-center mb-8 text-lg">
      Get your vehicle uplifted to the nearest workshop.
    </p>

    {/* Map Component */}
    <UpliftingMap />

    <p className="text-center mt-8 text-lg">
      Our team will ensure your vehicle is safely transported to the nearest workshop for repairs.
    </p>
  </div>
);

export default UpliftingPage;