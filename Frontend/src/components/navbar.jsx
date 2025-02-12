import React, { useState, useEffect } from "react";

const images = [
  "https://img.freepik.com/premium-photo/auto-mechanic-repairing-car-engine-auto-repair-shop-car-service-maintenance-concept-generative-ai_804788-123799.jpg?w=826",
  "https://img.freepik.com/premium-photo/auto-mechanic-working-car-mechanics-garage-ai-generative_955712-3042.jpg?w=996",
  "https://previews.123rf.com/images/nsit0108/nsit01082305/nsit0108230502464/204655738-car-mechanic-modern-garage-motor-workshop-generate-ai.jpg"
];

const Navbar = () => {
  return (
    <div className="navbar bg-gray-800 p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_1iTRinc7ejZLkHzvidWR9ck1xHso99e-A&s" alt="MechKonnect Logo" className="h-10 w-10 mr-2" />
        <a className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300 cursor-pointer">MechKonnect</a>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex space-x-6">
          <li><a className="text-white hover:text-blue-400 transition duration-300" href="#home">Home</a></li>
          <li><a className="text-white hover:text-blue-400 transition duration-300" href="#workshops">Workshops</a></li>
          <li><a className="text-white hover:text-blue-400 transition duration-300" href="#requests">Requests</a></li>
          <li><a className="text-white hover:text-blue-400 transition duration-300" href="#spare-parts">Spare Parts</a></li>
        </ul>
      </div>
    </div>
  );
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
    </div>
  );
};

export default App;
