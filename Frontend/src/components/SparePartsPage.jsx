import React from "react";
import { useLocation } from "react-router-dom";

const SparePartsPage = () => {
  const location = useLocation();
  const part = location.state?.part;

  if (!part) return <h2 className="text-center mt-10 text-xl text-white">No spare part selected.</h2>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">{part.name}</h1>
      <img src={part.imageUrl} alt={part.name} className="w-64 h-64 object-cover rounded-lg shadow-lg mb-4" />
      <p className="text-lg">{part.description}</p>
      <span className="text-2xl font-bold">${part.price}</span>
    </div>
  );
};

export default SparePartsPage;
