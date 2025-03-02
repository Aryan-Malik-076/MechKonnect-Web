import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Carousel from "./Carousel";
import Card1 from "./Card1"; // Import updated Card1 component

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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVOZ1oDtBZhtiutGtSe9xZ1G1cDJa1vlW1Q&s",
      navigateTo: "/uplifting",
    },
    {
      id: 2,
      name: "Mobile Mechanic",
      description: "Get a mobile workshop to your location.",
      image: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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
            <Card1
              key={card.id}
              part={card}
              isRoadside={true} // Ensures correct button names for Roadside Assistance
              onBuyNowClick={() => navigate(card.navigateTo)} // Navigates to correct page
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadsideAssistancePage;
