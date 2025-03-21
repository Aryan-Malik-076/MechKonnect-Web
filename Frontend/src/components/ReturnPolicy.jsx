import React from "react";
import NavBar from "./navbar";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Return Policy</h1>
        <p className="text-lg text-gray-300">
          We accept returns within 30 days of purchase. Please ensure the product is in original condition.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Conditions for Returns:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>Item must be unused and in original packaging.</li>
          <li>Proof of purchase is required.</li>
          <li>Refunds will be processed within 7 business days.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPolicy;
