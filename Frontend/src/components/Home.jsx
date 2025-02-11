import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
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

    fetchSpareParts();
  }, []);

  const nextSlide = () => {
    if (startIndex + 3 < spareParts.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const prevSlide = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white flex flex-col items-start justify-left p-4 relative">
        <h1 className="text-3xl font-bold mb-4 italic underline">Recently Added</h1>
        
        {/* Custom Carousel */}
        <div className="carousel w-full flex gap-4 overflow-hidden p-4 relative">
          {/* Previous Arrow Button */}
          {startIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-0 hover:opacity-100 transition-opacity"
            >
              ❮
            </button>
          )}
          
          {spareParts.slice(startIndex, startIndex + 3).map((part) => (
            <div key={part._id} className="carousel-item w-1/3 flex justify-center">
              <div onClick={() => navigate("/spareparts")} className="cursor-pointer w-full max-w-xs">
                <Card part={part} />
              </div>
            </div>
          ))}
          
          {/* Next Arrow Button */}
          {startIndex + 3 < spareParts.length && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-0 hover:opacity-100 transition-opacity"
            >
              ❯
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
