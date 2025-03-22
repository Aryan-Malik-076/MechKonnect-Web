import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Card from "./Card";
import axios from "axios";

import { ChevronRight } from "lucide-react";

const homeImages = [
  "https://img.freepik.com/premium-photo/auto-mechanic-repairing-car-engine-auto-repair-shop-car-service-maintenance-concept-generative-ai_804788-123799.jpg?w=826",
  "https://img.freepik.com/premium-photo/auto-mechanic-working-car-mechanics-garage-ai-generative_955712-3042.jpg?w=996",
  "https://previews.123rf.com/images/nsit0108/nsit01082305/nsit0108230502464/204655738-car-mechanic-modern-garage-motor-workshop-generate-ai.jpg",
];

// Simple SVG icon components to replace lucide icons
const IconTool = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={filled ? "text-yellow-400" : "text-gray-400"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const Home = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [partsResponse, workshopsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/spareParts"),
          axios.get("http://localhost:5000/api/workshops")
        ]);
        
        setSpareParts(partsResponse.data);
        setWorkshops(workshopsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSeeAllParts = () => {
    navigate("/spare-parts");
  };

  const handleSeeAllWorkshops = () => {
    navigate("/workshop");
  };

  // Custom carousel component with indicators and controls
  const HeroCarousel = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="relative h-96 w-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10" />
            <img
              src={img}
              alt={`MecheKonect slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
              <h1 className="text-5xl font-bold text-white mb-4">
                Your One-Stop <span className="text-blue-400">Automotive</span> Solution
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-lg">
                Connect with top workshops and find quality spare parts for your vehicle maintenance needs.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/workshop')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                >
                  Find Workshops
                </button>
                <button
                  onClick={() => navigate('/spare-parts')}
                  className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition duration-300"
                >
                  Browse Parts
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-white opacity-50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  };

  const SectionHeader = ({ title, onSeeAll }) => (
    <div className="flex justify-between items-center w-full mb-6">
      <h2 className="text-2xl font-bold text-white">
        <span className="border-b-2 border-blue-500 pb-1">{title}</span>
      </h2>
      <button
        onClick={onSeeAll}
        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
      >
        See all <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <HeroCarousel images={homeImages} />

      <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:bg-gray-700 transition-colors">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <IconTool />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Parts</h3>
            <p className="text-gray-300">Find genuine spare parts for all vehicle makes and models.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:bg-gray-700 transition-colors">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <IconSettings />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Workshops</h3>
            <p className="text-gray-300">Connect with certified mechanics and specialized repair shops.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:bg-gray-700 transition-colors">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <IconStar />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
            <p className="text-gray-300">Read verified customer reviews to make informed decisions.</p>
          </div>
        </div>

        {/* Spare Parts Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Recently Added Spare Parts" 
            onSeeAll={handleSeeAllParts} 
          />
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {spareParts.slice(0, 4).map((part) => (
                <Card key={part._id} part={part} isHomePage={true} />
              ))}
            </div>
          )}
        </section>

        {/* Workshops Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Top-Rated Workshops" 
            onSeeAll={handleSeeAllWorkshops} 
          />
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workshops.slice(0, 4).map((workshop) => (
                <Card key={workshop._id || workshop.name} part={workshop} isWorkshop={true} isHomePage={true} />
              ))}
            </div>
          )}
        </section>

        {/* Testimonials section */}
        <section className="mb-16">
          <SectionHeader title="Customer Testimonials" onSeeAll={() => navigate('/testimonials')} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Raja Abdul Rehman</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={true} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                "Found exactly the parts I needed for my Toyota at a great price. The delivery was prompt and the quality was excellent."
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Uzair </h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < 4} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                "The workshop I found through MecheKonect did an amazing job fixing my car's AC system. Professional service and reasonable pricing."
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get your vehicle serviced?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join MecheKonect today and connect with the best automotive service providers in your area.
          </p>
          <button 
            className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/SignUp')}
          >
            Sign Up Now
          </button>
        </section>
      </div>
      
    </div>
  );
};

export default Home;