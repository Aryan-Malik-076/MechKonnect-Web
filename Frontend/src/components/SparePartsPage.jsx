// src/components/SparePartsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"; // Reuse the Card component

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/spareParts");
        setSpareParts(response.data);
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    fetchSpareParts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4 italic underline">All Spare Parts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {spareParts.map((part) => (
          <Card key={part._id} part={part} />
        ))}
      </div>
    </div>
  );
};

export default SparePartsPage;