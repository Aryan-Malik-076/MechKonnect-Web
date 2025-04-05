import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Carousel from "./Carousel";
import Card1 from "./Card1";

const requestImages = [
  "https://cdn.pixabay.com/photo/2020/03/09/13/54/engineer-4915797_640.jpg",
  "https://t3.ftcdn.net/jpg/06/42/15/52/360_F_642155259_wkEIRRSocT0VH4W8E7lneTiywgwJcvFc.jpg",
  "https://as1.ftcdn.net/v2/jpg/08/48/72/70/1000_F_848727020_6MNG7yeaa8kpCDjuzLXsXhCiX2QWDA0a.jpg",
];

const RequestPage = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      name: "Car Service",
      description: "Schedule a complete car service appointment with certified mechanics.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkz3CvVTr4w4ZIBkF7EsvcVNNocX4ghGqTKQ&s",
      onClick: () => navigate("/workshop"),
      serviceName: "Car Service",
      icon: "🔧"
    },
    {
      id: 2,
      name: "Request Parts",
      description: "Request genuine spare parts for any vehicle make and model.",
      image: "https://media.istockphoto.com/id/1059972498/photo/engine-pistons-crankshaft-mechanism-3d-render.jpg?s=612x612&w=0&k=20&c=8Dm_RRiZeSpZJy9_LvL7JbIVPi_VJ6nMXV7WNPAGsbY=",
      onClick: () => navigate("/spare-parts"),
      serviceName: "Request Parts",
      icon: "⚙️"
    },
    {
      id: 3,
      name: "Roadside Assistance",
      description: "Get 24/7 emergency roadside help for breakdowns and issues.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6W0yV20fMOMENlc2ZCXg6MTUM4hphdB2nK_a00GawXWlUEQn3lG3_ariedokTOgBD1i0&usqp=CAU",
      onClick: () => navigate("/roadside-assistance"),
      serviceName: "Roadside Assistance",
      icon: "🚗"
    },
    {
      id: 4,
      name: "Smart Key",
      description: "Get a duplicate or replacement smart key programmed for your vehicle.",
      image: "https://img.freepik.com/free-vector/car-keys_23-2147511575.jpg",
      onClick: () => navigate("/smart-key"),
      serviceName: "Smart Key",
      icon: "🔑"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />
      
      {/* Hero section with carousel */}
      <div className="relative">
        <Carousel images={requestImages} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Premium Auto Services
            </h1>
            <p className="text-xl text-gray-200 mt-2 max-w-2xl drop-shadow-md">
              Expert mechanics and quality parts for all your automotive needs
            </p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
            <span className="relative inline-block">
              Request a Service
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Choose from our premium services tailored to keep your vehicle in perfect condition
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <div 
              key={card.id}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Card1
                part={card}
                isWorkshop={false}
                serviceName={card.serviceName}
              />
            </div>
          ))}
        </div>
        
        {/* Additional call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900 to-gray-800 rounded-xl p-8 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Custom Service?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our team of expert mechanics can help with any automotive problem.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto bg-gray-950 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 MechKonnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;