import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Shield, PenToolIcon as Tool, Clock, Star } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <Tool className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold text-white">MecKonnect</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className={`container mx-auto px-6 py-12 md:py-24 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                <span>Professional Mechanical Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                <span className="text-blue-500">MecKonnect</span> Your Trusted Mechanical Partner
              </h1>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              Connecting skilled mechanics with those in need. Our platform provides reliable, professional mechanical
              services with transparent pricing and verified experts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 bg-transparent border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
              >
                Login to Account
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-slate-300">Verified Mechanics</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-slate-300">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-slate-300">Top-Rated Service</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur-xl opacity-70"></div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional Mechanic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 bg-slate-800/90 p-3 rounded-lg backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">100+ Mechanics Online Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default WelcomePage;
