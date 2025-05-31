import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./navbar";
import Carousel from "./Carousel";
import Card from "./Card";

const sparePartsImages = [
  "https://media.istockphoto.com/id/1319939893/photo/car-is-standing-on-the-breakdown-lane-asphalt-and-tyre-italy.jpg?s=612x612&w=0&k=20&c=8e94VWra2DQqm-Dgv9J1Eieab4ctwpwCK5qqPFFtqno=",
  "https://img.freepik.com/free-photo/mechanic-repairing-car-engine-workshop_1232-3435.jpg",
  "https://img.freepik.com/free-photo/mechanic-checking-car-engine-auto-repair-garage_1232-3574.jpg",
];

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpareParts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/spareParts");
        setSpareParts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching spare parts:", error);
        setError("Failed to load spare parts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpareParts();
  }, []);

  const handleBuyNowClick = (part) => {
    setSelectedPart(part);
    setIsPopupOpen(true);
    // Add a body class to prevent scrolling when modal is open
    document.body.classList.add("overflow-hidden");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPart(null);
    // Remove the body class to enable scrolling again
    document.body.classList.remove("overflow-hidden");
  };

  const handleConfirmPurchase = () => {
    navigate("/payment", { state: { selectedPart } });
  };

  // Filter parts based on search term
  const filteredParts = spareParts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort parts based on sort option
  const sortedParts = [...filteredParts].sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    } else if (sortOption === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "nameDesc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel images={sparePartsImages} />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">Premium Spare Parts</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              High-quality automotive components for all your repair needs
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold text-white relative inline-block">
              <span className="relative z-10">Browse Spare Parts</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search parts..."
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                className="bg-gray-800 text-white px-4 py-2 rounded-lg appearance-none cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="nameAsc">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
              </select>
            </div>
          </div>
          
          {/* Filter tags/categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition">
              All Parts
            </button>
            <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-600 transition">
              Engine Components
            </button>
            <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-600 transition">
              Electrical
            </button>
            <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-600 transition">
              Brakes & Suspension
            </button>
            <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-600 transition">
              Filters
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-900 bg-opacity-20 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button 
              className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {sortedParts.length === 0 ? (
              <div className="text-center p-12 bg-gray-800 rounded-lg">
                <p className="text-xl text-gray-400">No spare parts found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedParts.map((part) => (
                  <div key={part._id} className="transform hover:scale-105 transition duration-300">
                    <Card part={part} onBuyNowClick={handleBuyNowClick} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex space-x-2">
            <button className="bg-gray-800 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <span>&lt;</span>
            </button>
            <button className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">1</button>
            <button className="bg-gray-800 text-white w-10 h-10 rounded-lg flex items-center justify-center">2</button>
            <button className="bg-gray-800 text-white w-10 h-10 rounded-lg flex items-center justify-center">3</button>
            <button className="bg-gray-800 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <span>&gt;</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Popular Categories Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center transform hover:scale-105 transition cursor-pointer">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold">Engine Parts</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center transform hover:scale-105 transition cursor-pointer">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold">Electrical</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center transform hover:scale-105 transition cursor-pointer">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛑</span>
              </div>
              <h3 className="font-semibold">Brakes</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center transform hover:scale-105 transition cursor-pointer">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏎️</span>
              </div>
              <h3 className="font-semibold">Performance</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup Modal with Backdrop Blur */}
      {isPopupOpen && selectedPart && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-xl transform transition-all w-full max-w-lg">
              <div className="relative">
                <img
                  src={selectedPart.imageUrl}
                  alt={selectedPart.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={handleClosePopup}
                  className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedPart.name}</h2>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">In Stock</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300">{selectedPart.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400">Part Number</p>
                      <p className="font-medium">{selectedPart._id?.substring(0, 8) || "SP-12345"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400">Compatibility</p>
                      <p className="font-medium">Multiple Models</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400">Warranty</p>
                      <p className="font-medium">1 Year</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400">Shipping</p>
                      <p className="font-medium">Free</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-3xl font-bold">${selectedPart.price?.toFixed(2) || "59.99"}</p>
                    </div>
                    
                    <div className="space-x-3">
                      <button
                        onClick={handleClosePopup}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmPurchase}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                      >
                        <span>Buy Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartsPage;