import React, { useState } from "react";
import { Phone, Mail, MapPin, Upload, X, Calendar, User } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [partnerData, setPartnerData] = useState({
    partnerName: "",
    partnerRole: "",
    partnerBio: "",
    partnerEmail: "",
    partnerPhone: "",
    partnerLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePartnerChange = (e) => {
    const { name, value } = e.target;
    setPartnerData({
      ...partnerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    // Handle partner form submission
    console.log("Partner form submitted:", partnerData);
    alert("Partner information submitted successfully!");
    setPartnerData({ 
      partnerName: "", 
      partnerRole: "", 
      partnerBio: "", 
      partnerEmail: "", 
      partnerPhone: "", 
      partnerLocation: "" 
    });
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  // Sample partners data
  const partners = [
    {
      id: 1,
      name: "Raja",
      role: "Senior Mechanic",
      image: "/api/placeholder/300/300",
      contact: "+1 (555) 123-4567",
      location: "New York, NY",
      specialty: "Engine Diagnostics"
    },
    {
      id: 2,
      name: "Uzair",
      role: "Workshop Manager",
      image: "/api/placeholder/300/300",
      contact: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      specialty: "European Imports"
    },
    {
      id: 3,
      name: "Aryan",
      role: "Parts Specialist",
      image: "/api/placeholder/300/300",
      contact: "+1 (555) 456-7890",
      location: "Chicago, IL",
      specialty: "Vintage Restorations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Get in touch with the MechKonnect team or become a partner in our network
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Call Us</h3>
            <p className="text-gray-600 mb-1">+1 (555) 123-4567</p>
            <p className="text-gray-500">Monday-Friday, 9am-5pm EST</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Email Us</h3>
            <p className="text-gray-600 mb-1">support@mechkonnect.com</p>
            <p className="text-gray-500">info@mechkonnect.com</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-1">123 Mechanic Street</p>
            <p className="text-gray-500">Autoville, AV 12345</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you today?"
                rows="5"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Partners Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">Our MechKonnect Partners</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Connect with our network of certified mechanics and automotive specialists across the country.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative">
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-3 rounded-lg text-sm font-medium">
                    {partner.specialty}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-1">{partner.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{partner.role}</p>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <span>{partner.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>{partner.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Available Mon-Fri</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Partner Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-10 mb-16">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Join Our Partner Network</h2>
          <p className="text-gray-600 mb-8">
            Want to be featured as a MechKonnect partner? Fill out the form below to join our growing network of automotive professionals.
          </p>
          
          <form onSubmit={handlePartnerSubmit} className="bg-white p-8 rounded-xl shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="partnerName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={partnerData.partnerName}
                  onChange={handlePartnerChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="partnerRole" className="block text-gray-700 font-medium mb-2">Role/Specialty</label>
                <input
                  type="text"
                  id="partnerRole"
                  name="partnerRole"
                  value={partnerData.partnerRole}
                  onChange={handlePartnerChange}
                  placeholder="Master Mechanic, Engine Specialist, etc."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="partnerEmail" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="partnerEmail"
                  name="partnerEmail"
                  value={partnerData.partnerEmail}
                  onChange={handlePartnerChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="partnerPhone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="partnerPhone"
                  name="partnerPhone"
                  value={partnerData.partnerPhone}
                  onChange={handlePartnerChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="partnerLocation" className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                id="partnerLocation"
                name="partnerLocation"
                value={partnerData.partnerLocation}
                onChange={handlePartnerChange}
                placeholder="City, State"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="partnerBio" className="block text-gray-700 font-medium mb-2">Bio/Description</label>
              <textarea
                id="partnerBio"
                name="partnerBio"
                value={partnerData.partnerBio}
                onChange={handlePartnerChange}
                placeholder="Tell us about your experience and specialties..."
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">Profile Picture</label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full"
            >
              Submit Partner Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;