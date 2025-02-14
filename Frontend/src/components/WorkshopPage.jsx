// src/components/WorkshopPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"; // Reuse the Card component

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
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4 italic underline">All Workshops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {workshops.map((workshop) => (
          <Card key={workshop.name} part={workshop} isWorkshop={true} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopPage;