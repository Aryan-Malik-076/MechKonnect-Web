import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import Carousel from "./Carousel";
import Card from "./Card"; // Reuse the Card component

const sparePartsImages = [
  "https://img.freepik.com/free-photo/mechanic-hand-checking-fixing-broken-car-car-service-garage_146671-19718.jpg?t=st=1739710075~exp=1739713675~hmac=8df0c96c34ec95136f29cfa2093859a27adbc4bfd3f27794e7cd5d54b1dc0327&w=996",
  "https://img.freepik.com/free-photo/mechanic-repairing-car-engine-workshop_1232-3435.jpg",
  "https://img.freepik.com/free-photo/mechanic-checking-car-engine-auto-repair-garage_1232-3574.jpg",
];

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
    <>
      <NavBar /> {/* Navbar at the top */}
      <Carousel images={sparePartsImages} /> {/* Carousel for spare parts images */}
      <div className="min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-4 italic underline">All Spare Parts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {spareParts.map((part) => (
            <Card key={part._id} part={part} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SparePartsPage;
