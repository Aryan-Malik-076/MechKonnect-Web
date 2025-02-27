import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    workshop: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Appointment booked successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 rounded text-black border border-gray-300"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-2 rounded text-black border border-gray-300"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone"
          className="w-full p-2 rounded text-black border border-gray-300"
          required
        />
        <input
          type="text"
          name="workshop"
          value={formData.workshop}
          onChange={handleChange}
          placeholder="Workshop Name"
          className="w-full p-2 rounded text-black border border-gray-300"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 rounded text-black border border-gray-300"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white font-semibold"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentsPage;
