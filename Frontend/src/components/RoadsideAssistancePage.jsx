import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
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
      imageUrl: "https://via.placeholder.com/300",
      serviceName: "Uplifting",
      navigateTo: "/uplifting",
    },
    {
      id: 2,
      name: "Mobile Workshop",
      description: "Get a mobile workshop to your location.",
      imageUrl: "https://via.placeholder.com/300",
      serviceName: "Mobile Workshop",
      navigateTo: "/mobile-workshop",
    },
  ];

  return (
    <>
      {/* Navbar for navigation */}
      <Navbar />

      {/* Carousel with roadside assistance images */}
      <Carousel images={roadsideImages} />

      {/* Main Content */}
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl font-bold italic underline mb-6 text-center">
          Roadside Assistance
        </h1>
        <p className="text-center mb-8 text-lg">
          Get quick help when you need it the most.
        </p>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              part={card}
              isWorkshop={true} // Treat it like a service
              onBuyNowClick={() => navigate(card.navigateTo)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadsideAssistancePage;
