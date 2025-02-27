import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Card from "./Card";
import Carousel from "./Carousel";
import axios from "axios";

const homeImages = [
  "https://img.freepik.com/premium-photo/auto-mechanic-repairing-car-engine-auto-repair-shop-car-service-maintenance-concept-generative-ai_804788-123799.jpg?w=826",
  "https://img.freepik.com/premium-photo/auto-mechanic-working-car-mechanics-garage-ai-generative_955712-3042.jpg?w=996",
  "https://previews.123rf.com/images/nsit0108/nsit01082305/nsit0108230502464/204655738-car-mechanic-modern-garage-motor-workshop-generate-ai.jpg",
];

const Home = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/spareParts");
        setSpareParts(response.data);
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchSpareParts();
    fetchWorkshops();
  }, []);

  return (
    <>
      <NavBar />
      <Carousel images={homeImages} />
      <div className="min-h-screen bg-black text-white flex flex-col items-start p-4 relative">
        
        {/* Spare Parts Section */}
        <h1 className="text-3xl font-bold mb-4 italic underline">Recently Added Spare Parts</h1>
        <div className="relative w-full">
          <div className="flex gap-4 overflow-hidden p-4">
            {spareParts.slice(0, 4).map((part) => (
              <Card key={part._id} part={part} isHomePage={true} />
            ))}
          </div>
        </div>

        {/* Workshops Section */}
        <h1 className="text-3xl font-bold mt-8 mb-4 italic underline">Popular Workshops</h1>
        <div className="relative w-full">
          <div className="flex gap-4 overflow-hidden p-4">
            {workshops.slice(0, 4).map((workshop) => (
              <Card key={workshop.name} part={workshop} isWorkshop={true} isHomePage={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
