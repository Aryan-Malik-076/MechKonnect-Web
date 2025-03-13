import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Carousel from "./Carousel";
import Card1 from "./Card1";
import { PhoneCall, Clock, MapPin } from "lucide-react";

const roadsideImages = [
  "https://img.freepik.com/free-photo/broken-car-street-help-service_1150-11034.jpg",
  "https://img.freepik.com/free-photo/mechanic-fixing-broken-car-roadside-assistance_1150-11031.jpg",
];

const RoadsideAssistancePage = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      name: "Vehicle Uplifting",
      description: "Professional towing service to transport your vehicle safely to the nearest authorized workshop.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVOZ1oDtBZhtiutGtSe9xZ1G1cDJa1vlW1Q&s",
      navigateTo: "/uplifting",
      icon: "🚚",
    },
    {
      id: 2,
      name: "Mobile Mechanic",
      description: "Experienced mechanics will come to your location to diagnose and fix your vehicle on the spot.",
      image: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      navigateTo: "/mobile-workshop",
      icon: "🔧",
    },
  ];

  const features = [
    {
      title: "24/7 Availability",
      description: "Our roadside assistance team is available around the clock, every day of the year.",
      icon: <Clock className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Fast Response Time",
      description: "Average arrival time of 30 minutes or less in most service areas.",
      icon: <PhoneCall className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Nationwide Coverage",
      description: "Service available across all major cities and highways.",
      icon: <MapPin className="h-10 w-10 text-blue-500" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel images={roadsideImages} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Emergency Roadside Assistance
              </h1>
              <p className="text-xl text-gray-200 mt-4 drop-shadow-md">
                Quick, reliable help when you're stranded. Just a call away.
              </p>
              <div className="mt-6">
                <button 
                  onClick={() => navigate("/emergency-call")}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg mr-4 transition-all duration-300"
                >
                  Emergency Call
                </button>
                <button 
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Service Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="relative inline-block">
              Roadside Assistance Services
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional solutions for all roadside emergencies. Fast response, reliable service.
          </p>
        </div>
        
        {/* Service Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {cardsData.map((card) => (
            <div 
              key={card.id}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ maxWidth: '450px' }}
            >
              <Card1
                part={card}
                isRoadside={true}
                onBuyNowClick={() => navigate(card.navigateTo)}
              />
            </div>
          ))}
        </div>
        
        {/* Features Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Why Choose Our Roadside Assistance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stranded on the Road?</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Don't wait until it's too late. Download our mobile app for one-tap emergency assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-black text-white font-bold py-3 px-6 rounded-lg flex items-center">
              <span className="mr-2">🍎</span> App Store
            </button>
            <button className="bg-black text-white font-bold py-3 px-6 rounded-lg flex items-center">
              <span className="mr-2">🤖</span> Google Play
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto bg-gray-950 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 MechKonnect Roadside Assistance. 24/7 Emergency Services.</p>
          <p className="mt-2">Emergency Hotline: <span className="text-white font-semibold">1-800-MECHHELP</span></p>
        </div>
      </div>
    </div>
  );
};

export default RoadsideAssistancePage;