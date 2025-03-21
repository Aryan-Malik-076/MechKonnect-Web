import React from "react";
import NavBar from "./navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">Privacy Policy</h1>

        <p className="text-lg text-gray-300 mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal data.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-blue-300">Information We Collect:</h2>
          <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-2">
            <li>Personal information (name, email, phone number) when you register.</li>
            <li>Transaction data for purchases and refunds.</li>
            <li>Usage data for improving our services.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-blue-300">How We Use Your Data:</h2>
          <p className="text-gray-300 mt-2">
            We use your data to process transactions, improve our services, and communicate with you. Your information is never sold to third parties.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-blue-300">Security Measures:</h2>
          <p className="text-gray-300 mt-2">
            We implement strict security measures to protect your data from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
