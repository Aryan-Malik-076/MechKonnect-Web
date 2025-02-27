import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Carousel from "./Carousel";
import Card from "./Card";

const sparePartsImages = [
  "https://img.freepik.com/free-photo/mechanic-hand-checking-fixing-broken-car-car-service-garage_146671-19718.jpg?t=st=1739710075~exp=1739713675~hmac=8df0c96c34ec95136f29cfa2093859a27adbc4bfd3f27794e7cd5d54b1dc0327&w=996",
  "https://img.freepik.com/free-photo/mechanic-repairing-car-engine-workshop_1232-3435.jpg",
  "https://img.freepik.com/free-photo/mechanic-checking-car-engine-auto-repair-garage_1232-3574.jpg",
];

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const handleBuyNowClick = (part) => {
    setSelectedPart(part);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPart(null);
  };

  const handleConfirmPurchase = () => {
    // Handle the purchase confirmation logic here
    alert("Purchase confirmed!");
    handleClosePopup();
  };

  return (
    <>
      <NavBar />
      <Carousel images={sparePartsImages} />
      <div className="min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-4 italic underline">All Spare Parts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {spareParts.map((part) => (
            <Card
              key={part._id}
              part={part}
              onBuyNowClick={handleBuyNowClick} // Pass Buy Now handler
            />
          ))}
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md">
            <img
              src={selectedPart.imageUrl} // Use the correct field name
              alt={selectedPart.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{selectedPart.name}</h2>
            <p className="text-gray-700">{selectedPart.description}</p>
            <p className="text-lg font-semibold mt-2">${selectedPart.price}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SparePartsPage;