import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About MechKonnect</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Revolutionizing the automotive service industry through technology
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              MechKonnect was founded in 2022 with a simple mission: to bridge the gap between skilled mechanics and vehicle owners in need of reliable service. 
            </p>
            <p className="text-gray-700 mb-4">
              Our founder, after experiencing frustration with finding trustworthy mechanics during an emergency breakdown, decided to create a platform that would connect customers with verified service providers quickly and efficiently.
            </p>
            <p className="text-gray-700">
              Today, MechKonnect has grown into a nationwide network of certified mechanics, workshops, and spare parts suppliers, all committed to providing exceptional service and transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
              <p className="text-gray-600">
                We verify all our partners and promote clear communication between mechanics and customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficiency & Speed</h3>
              <p className="text-gray-600">
                Quick response times and efficient service are at the core of what we do.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building a strong network of trusted professionals and satisfied customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Leadership Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Team Member {item}</h3>
                <p className="text-gray-500 text-sm">Position Title</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;