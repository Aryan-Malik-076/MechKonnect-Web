import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [sparePartIndex, setSparePartIndex] = useState(0);
  const [workshopIndex, setWorkshopIndex] = useState(0);
  const navigate = useNavigate();

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

  const navigateToWorkshop = (workshop) => {
    navigate(`/WorkshopPage/${workshop.name}`);
  };

  // Slider Functions
  const nextSpareParts = () => {
    if (sparePartIndex + 4 < spareParts.length) {
      setSparePartIndex(sparePartIndex + 4);
    }
  };

  const prevSpareParts = () => {
    if (sparePartIndex - 4 >= 0) {
      setSparePartIndex(sparePartIndex - 4);
    }
  };

  const nextWorkshops = () => {
    if (workshopIndex + 4 < workshops.length) {
      setWorkshopIndex(workshopIndex + 4);
    }
  };

  const prevWorkshops = () => {
    if (workshopIndex - 4 >= 0) {
      setWorkshopIndex(workshopIndex - 4);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white flex flex-col items-start p-4 relative">
        {/* Spare Parts Section */}
        <h1 className="text-3xl font-bold mb-4 italic underline">Recently Added Spare Parts</h1>
        <div className="relative w-full">
          <div className="flex gap-4 overflow-hidden p-4">
            {spareParts.slice(sparePartIndex, sparePartIndex + 4).map((part) => (
              <Card key={part._id} part={part} />
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between w-full px-4 mt-2">
            <button
              onClick={prevSpareParts}
              className={`bg-gray-800 text-white p-3 rounded-full ${sparePartIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
              disabled={sparePartIndex === 0}
            >
              ❮
            </button>
            <button
              onClick={nextSpareParts}
              className={`bg-gray-800 text-white p-3 rounded-full ${sparePartIndex + 4 >= spareParts.length ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
              disabled={sparePartIndex + 4 >= spareParts.length}
            >
              ❯
            </button>
          </div>
        </div>

        {/* Workshops Section */}
        <h1 className="text-3xl font-bold mt-8 mb-4 italic underline">Workshops</h1>
        <div className="relative w-full">
          <div className="flex gap-4 overflow-hidden p-4">
            {workshops.slice(workshopIndex, workshopIndex + 4).map((workshop) => (
              <Card key={workshop.name} part={workshop} isWorkshop={true} onClick={() => navigateToWorkshop(workshop)} />
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between w-full px-4 mt-2">
            <button
              onClick={prevWorkshops}
              className={`bg-gray-800 text-white p-3 rounded-full ${workshopIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
              disabled={workshopIndex === 0}
            >
              ❮
            </button>
            <button
              onClick={nextWorkshops}
              className={`bg-gray-800 text-white p-3 rounded-full ${workshopIndex + 4 >= workshops.length ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
              disabled={workshopIndex + 4 >= workshops.length}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
