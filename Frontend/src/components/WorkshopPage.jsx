import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Carousel from "./Carousel";
import Card from "./Card";

const workshopImages = [
  "https://png.pngtree.com/background/20250101/original/pngtree-contemporary-automobile-on-a-lift-in-a-mechanic-s-shop-3d-picture-image_11860009.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20240403/pngtree-auto-mechanic-working-in-garage-repair-service-image_15647939.jpg",
  "https://png.pngtree.com/thumb_back/fw800/background/20241225/pngtree-mechanic-pouring-fresh-motor-oil-into-a-car-engine-during-routine-image_16864027.jpg",
];

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/workshops");
        setWorkshops(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError("Failed to load workshops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkshops();
  }, []);

  // Function to handle navigation to the appointments page
  const handleBookAppointment = (workshopId = null) => {
    if (workshopId) {
      // If a specific workshop is selected, navigate with that ID
      navigate(`/appointments?workshopId=${workshopId}`);
    } else {
      // Otherwise just navigate to the appointments page
      navigate('/appointments');
    }
  };

  // Function to handle card click
  const handleCardClick = (workshop) => {
    // Navigate to the workshop detail page
    navigate(`/workshop/${workshop._id}`, { state: { workshop } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel images={workshopImages} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">Our Workshops</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Professional automotive services tailored to your needs
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            <span className="relative z-10">Available Workshops</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
          </h2>
          
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300">
              Filter
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300">
              Sort
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
            {workshops.length === 0 ? (
              <div className="text-center p-12">
                <p className="text-xl text-gray-400">No workshops available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {workshops.map((workshop) => (
                  <div 
                    key={workshop._id || workshop.name} 
                    onClick={() => handleCardClick(workshop)}
                    className="cursor-pointer transform hover:scale-105 transition duration-300"
                  >
                    <Card part={workshop} isWorkshop={true} />
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium transition duration-300">
                View More Workshops
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Feature Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Workshops?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-300">Our workshops are staffed with certified professionals</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-gray-300">Get your vehicle serviced in record time</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-300">Quality service that doesn't break the bank</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-blue-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to book a workshop?</h2>
          <p className="text-gray-300 mb-6">Schedule an appointment today and experience our premium service</p>
          <button 
            className="bg-white text-blue-900 hover:bg-gray-200 px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
            onClick={() => handleBookAppointment()}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;