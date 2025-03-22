import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./navbar";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    workshop: "",
    workshopId: "",
    date: "",
    time: "",
  });
  

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch workshops for the dropdown
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();

    // Check for workshopId in URL query params
    const params = new URLSearchParams(location.search);
    const workshopId = params.get("workshopId");
    
    if (workshopId) {
      // If workshopId is found in URL, update the form data
      setFormData(prev => ({
        ...prev,
        workshopId
      }));
      
      // Try to get the workshop details to fill the workshop name
      const getWorkshopDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/workshops/${workshopId}`);
          if (response.data) {
            setFormData(prev => ({
              ...prev,
              workshop: response.data.name
            }));
          }
        } catch (error) {
          console.error("Error fetching workshop details:", error);
        }
      };
      
      getWorkshopDetails();
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    // If selecting from workshop dropdown, update workshopId as well
    if (name === "workshop") {
      const selectedWorkshop = workshops.find(w => w.name === value);
      if (selectedWorkshop) {
        setFormData(prev => ({
          ...prev,
          workshopId: selectedWorkshop._id
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Submit appointment data to backend
      const response = await axios.post("http://localhost:5000/api/appointments", formData);
      
      if (response.status === 200 || response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/workshop");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">Book Your Appointment</h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Schedule a service appointment with our expert technicians and get your vehicle back in top condition
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Form Header */}
              <div className="bg-blue-600 p-6">
                <h2 className="text-2xl font-bold text-white">Appointment Details</h2>
                <p className="text-blue-100">Fill in your information to schedule a service</p>
              </div>
              
              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-200 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your contact number"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-200 font-medium mb-2">Select Workshop</label>
                    <select
                      name="workshop"
                      value={formData.workshop}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a workshop</option>
                      {workshops.map((workshop) => (
                        <option 
                          key={workshop._id} 
                          value={workshop.name}
                          selected={workshop._id === formData.workshopId}
                        >
                          {workshop.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">Appointment Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">Preferred Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Book Your Appointment
                  </button>
                </div>
                
                <div className="mt-4 text-center text-gray-400 text-sm">
                  By booking an appointment, you agree to our service terms and conditions
                </div>
              </form>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-2xl mb-3">📞</div>
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-gray-400">Call us at +92-300-1234567 for assistance with booking</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-2xl mb-3">⏰</div>
              <h3 className="font-bold text-lg mb-2">Service Hours</h3>
              <p className="text-gray-400">We're open Monday to Saturday, 9:00 AM to 6:00 PM</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-lg mb-2">Emergency Service</h3>
              <p className="text-gray-400">Roadside assistance available 24/7 for emergencies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;