import React, { useState } from "react";
import { Phone, Mail, MapPin, Upload, X, Calendar, User, Clock, Star, Shield, Send, Wrench } from "lucide-react";
import Navbar from "./navbar";

import aryan from "../assets/aryan.jpeg";
import uzair from "../assets/uzair.jpeg";
import Raja from "../assets/Raja.jpeg";

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
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
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

  // Sample partners data with imported images
  const partners = [
    {
      id: 1,
      name: "Raja",
      role: "Senior Mechanic",
      image: Raja, // Use imported image
      contact: "+1 (555) 123-4567",
      location: "Islamabad, ISB",
      specialty: "Engine Diagnostics",
      rating: 4.9,
      experience: "12 years"
    },
    {
      id: 2,
      name: "Uzair",
      role: "Workshop Manager",
      image: uzair, // Use imported image
      contact: "+1 (555) 987-6543",
      location: "Attcok, AT",
      specialty: "European Imports",
      rating: 4.8,
      experience: "15 years"
    },
    {
      id: 3,
      name: "Aryan",
      role: "Parts Specialist",
      image: aryan, // Use imported image
      contact: "+1 (555) 456-7890",
      location: "Kamra, KC",
      specialty: "Vintage Restorations",
      rating: 4.7,
      experience: "8 years"
    }
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Header with Background Image */}
        <div className="relative bg-blue-900 text-white py-24">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-75"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90 mb-8">
              Connect with the MechKonnect team or join our network of trusted automotive professionals
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#contact-form" className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium transition duration-300">
                Send Message
              </a>
              <a href="#partner-section" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-medium transition duration-300">
                Become a Partner
              </a>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 transform -skew-y-3 origin-bottom-right"></div>
        </div>

        {/* Contact Information */}
        <div className="py-20 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">How Can We Help You?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team is ready to assist you with any questions about our services, partnerships, or technical support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-blue-600">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Call Us</h3>
              <p className="text-gray-600 mb-1 font-medium">+1 (555) 123-4567</p>
              <p className="text-gray-500">Monday-Friday, 9am-5pm EST</p>
              <div className="mt-6">
                <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-blue-600">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-1 font-medium">support@mechkonnect.com</p>
              <p className="text-gray-500">24/7 customer support</p>
              <div className="mt-6">
                <a href="mailto:support@mechkonnect.com" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Send Email
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-blue-600">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-1 font-medium">123 Mechanic Street</p>
              <p className="text-gray-500">Autoville, AV 12345</p>
              <div className="mt-6">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="bg-white rounded-xl shadow-lg p-10 mb-24 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Quick Response Time</h4>
                      <p className="text-gray-500 text-sm">We respond to all inquiries within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Secure Communication</h4>
                      <p className="text-gray-500 text-sm">Your information is always protected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Wrench className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Expert Support</h4>
                      <p className="text-gray-500 text-sm">Get help from our skilled automotive specialists</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Need Immediate Help?</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Call our hotline for urgent matters:
                  </p>
                  <div className="font-bold text-blue-800 text-lg mb-2">
                    +1 (555) 999-4321
                  </div>
                  <p className="text-gray-500 text-sm">Available 24/7 for emergencies</p>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        required />
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
                        required />
                    </div>
                  </div>
                  
                  <div>
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
                        className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  
                  <div>
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center w-full"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div id="partner-section" className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our MechKonnect Partners</h2>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                Connect with our network of certified mechanics and automotive specialists across the country.
              </p>
              <div className="flex justify-center space-x-4 mb-12">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">All Partners</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Engine Specialists</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">European Cars</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Vintage Repairs</button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
                  <div className="relative">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-3 rounded-lg text-sm font-medium">
                      {partner.specialty}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center text-white">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" fill="#FBBF24" />
                        <span className="font-medium mr-1">{partner.rating}</span>
                        <span className="text-sm text-gray-300">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-xl mb-1">{partner.name}</h3>
                        <p className="text-blue-600 font-medium">{partner.role}</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg px-3 py-1">
                        <span className="text-blue-800 text-sm font-medium">{partner.experience}</span>
                      </div>
                    </div>

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
                    
                    <div className="mt-6 flex space-x-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" /> Contact
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" /> Schedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center">
                View All Partners <MapPin className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Become a Partner Section */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-lg p-12 mb-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -mb-16 -ml-16"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-3 text-white">Join Our Partner Network</h2>
              <p className="text-blue-100 mb-8 max-w-2xl">
                Want to be featured as a MechKonnect partner? Fill out the form below to join our growing network of automotive professionals and start connecting with customers in your area.
              </p>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Partner Application</h3>
                  <p className="text-gray-600">Complete the information below to apply for our partner program. Our team will review your application and contact you within 3-5 business days.</p>
                </div>
                
                <form onSubmit={handlePartnerSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                        required />
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
                        required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        required />
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
                        required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="partnerLocation" className="block text-gray-700 font-medium mb-2">Location</label>
                    <input
                      type="text"
                      id="partnerLocation"
                      name="partnerLocation"
                      value={partnerData.partnerLocation}
                      onChange={handlePartnerChange}
                      placeholder="City, State"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required />
                  </div>

                  <div>
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

                  <div>
                    <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="imageUpload"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-full max-w-full object-contain rounded-lg" />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            >
                              <X className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 font-medium">
                              <span className="text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                      </label>
                      <input
                        id="imageUpload"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*" />
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required
                      />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-xl w-full flex items-center justify-center"
                  >
                    Submit Partner Application
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-10 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-gray-800">How do I join the MechKonnect network?</h3>
                <p className="text-gray-600">
                  Fill out the partner application form on this page with your information. Our team will review your application and contact you within 3-5 business days.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-gray-800">What are the benefits of becoming a partner?</h3>
                <p className="text-gray-600">
                  As a MechKonnect partner, you gain access to a wide network of customers, marketing support, and tools to manage your business efficiently.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-gray-800">How do I contact customer support?</h3>
                <p className="text-gray-600">
                  You can reach our customer support team via phone, email, or the contact form on this page. We're available 24/7 to assist you.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-gray-800">Is MechKonnect available nationwide?</h3>
                <p className="text-gray-600">
                  Yes, MechKonnect operates across the Islamic Republic Of Pakistan, connecting customers with certified mechanics in their area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;