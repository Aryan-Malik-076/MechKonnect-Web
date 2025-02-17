import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Carousel from "./Carousel";
import Card from "./Card"; // Import the Card component

const requestImages = [
  "https://img.freepik.com/free-photo/car-service-worker-repairing-vehicle_1232-4207.jpg",
  "https://img.freepik.com/free-photo/auto-mechanic-working-car-mechanics-garage_1232-3446.jpg",
  "https://img.freepik.com/free-photo/auto-repair-shop-worker-fixing-car_1232-2090.jpg",
];

const RequestPage = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      name: "Car Service",
      description: "Schedule a car service appointment.",
      image: "https://t3.ftcdn.net/jpg/04/96/48/30/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg",
      onClick: () => navigate("/workshop"),
      serviceName: "Car Service",
    },
    {
      id: 2,
      name: "Request Parts",
      description: "Request spare parts for your vehicle.",
      image: "https://media.istockphoto.com/id/1059972498/photo/engine-pistons-crankshaft-mechanism-3d-render.jpg?s=612x612&w=0&k=20&c=8Dm_RRiZeSpZJy9_LvL7JbIVPi_VJ6nMXV7WNPAGsbY=",
      onClick: () => navigate("/spare-parts"),
      serviceName: "Request Parts",
    },
    {
      id: 3,
      name: "Roadside Assistance",
      description: "Get help with roadside issues.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6W0yV20fMOMENlc2ZCXg6MTUM4hphdB2nK_a00GawXWlUEQn3lG3_ariedokTOgBD1i0&usqp=CAU",
      onClick: () => navigate("/roadside-assistance"),
      serviceName: "Roadside Assistance",
    },
    {
      id: 4,
      name: "Smart Key",
      description: "Get a duplicate smart key for your vehicle.",
      image: "https://img.freepik.com/free-vector/car-keys_23-2147511575.jpg",
      onClick: () => navigate("/smart-key"),
      serviceName: "Smart Key",
    },
  ];

  return (
    <>
      <NavBar /> {/* Navbar at the top */}
      <Carousel images={requestImages} /> {/* Carousel for request services */}
      <div className="min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-4 italic underline">Request a Service</h1>
        <p className="mb-6">Choose a service and proceed with your request.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              part={card}
              onClick={card.onClick}
              serviceName={card.serviceName} // Pass the serviceName prop
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestPage;
