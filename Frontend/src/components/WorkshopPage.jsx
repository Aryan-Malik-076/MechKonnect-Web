import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Carousel from "./Carousel";
import Card from "./Card";

const workshopImages = [
  "https://thumbs.dreamstime.com/z/car-blurry-workshop-background-351830621.jpg?ct=jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09GHevYvVqG9wR4sPBrNrifd0YaH-7HdUCg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhk62zjEZU73joOHcYEUOylsEVHL5Oyb_a1A&s",
];

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };
    
    fetchWorkshops();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <Carousel images={workshopImages} />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 italic underline">All Workshops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workshops.map((workshop) => (
            <Card key={workshop.name} part={workshop} isWorkshop={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;
