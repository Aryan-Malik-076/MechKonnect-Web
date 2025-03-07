import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/Home");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-3xl font-extrabold text-blue-500 mb-6 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-4">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? 
          <a href="/signup" className="text-blue-500 hover:underline"> Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;