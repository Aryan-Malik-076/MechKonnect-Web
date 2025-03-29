import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Hardcoded admin credentials (for testing only)
    const ADMIN_CREDENTIALS = {
      email: "admin1@gmail.com",
      password: "123",
      isAdmin: true
    };

    // Check if credentials match hardcoded admin
    if (form.email === ADMIN_CREDENTIALS.email && form.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("userId", "admin-user-id");
      localStorage.setItem("isAdmin", "true");
      setIsLoading(false);
      navigate("/admin-dashboard");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        // Check if user is admin and redirect accordingly
        if (data.isAdmin) {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin-dashboard");
        } else {
          localStorage.removeItem("isAdmin");
          navigate("/Home");
        }
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-4">
      {/* Logo and Branding */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-white text-xl font-bold">Meckonnect</span>
        </div>
      </div>
      
      {/* Card with glow effect */}
      <div className="w-full max-w-md border border-blue-800/40 bg-slate-950/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 pointer-events-none"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="p-8 space-y-3 text-center relative">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-200/70">Sign in to connect with your network</p>
        </div>

        <div className="px-8 pb-8 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-200">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-blue-400 transition-all duration-300 group-focus-within:text-blue-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 px-4 py-3 bg-slate-800/50 text-white border border-blue-800/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-blue-200">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3 h-5 w-5 text-blue-400 transition-all duration-300 group-focus-within:text-blue-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 px-4 py-3 bg-slate-800/50 text-white border border-blue-800/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-blue-600 rounded bg-slate-800 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-3 text-sm text-blue-200/70">
                  Remember me for 30 days
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-medium shadow-lg shadow-blue-700/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <LogIn className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="p-6 border-t border-blue-900/30 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-200/60">
            <span>New to Meckonnect?</span>
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;