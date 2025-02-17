// RoadsideAssistancePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Carousel from "./Carousel";
import Card from "./Card";

const roadsideImages = [
  "https://img.freepik.com/free-photo/broken-car-street-help-service_1150-11034.jpg",
  "https://img.freepik.com/free-photo/mechanic-fixing-broken-car-roadside-assistance_1150-11031.jpg",
];

const RoadsideAssistancePage = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      name: "Uplifting",
      description: "Get your vehicle uplifted to the nearest workshop.",
      image: "https://via.placeholder.com/300",
      onClick: () => navigate("/uplifting"),
      serviceName: "Uplifting",
    },
    {
      id: 2,
      name: "Mobile Workshop",
      description: "Get a mobile workshop to your location.",
      image: "https://via.placeholder.com/300",
      onClick: () => navigate("/mobile-workshop"),
      serviceName: "Mobile Workshop",
    },
  ];

  return (
    <>
      <NavBar /> {/* Navbar for navigation */}
      <Carousel images={roadsideImages} /> {/* Carousel with roadside assistance images */}

      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl font-bold italic underline mb-6 text-center">
          Roadside Assistance
        </h1>
        <p className="text-center mb-8 text-lg">
          Get quick help when you need it the most.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Card
                part={card}
                onClick={card.onClick}
                serviceName={card.serviceName}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadsideAssistancePage;