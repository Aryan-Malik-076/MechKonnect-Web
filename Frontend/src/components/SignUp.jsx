import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
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
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

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
        
        <div className="p-8 space-y-2 text-center relative">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Join Meckonnect</h2>
          <p className="text-blue-200/70">Connect with professionals in your industry</p>
        </div>

        {/* Progress indicator for multi-step form */}
        <div className="flex justify-center px-8 pb-4">
          <div className="flex items-center space-x-2 w-full max-w-xs">
            <div className={`h-2 rounded-full flex-1 ${step >= 1 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
            <div className={`h-2 rounded-full flex-1 ${step >= 2 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
          </div>
        </div>

        <div className="px-8 pb-6 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3 h-5 w-5 text-blue-400 transition-all duration-300 group-focus-within:text-blue-500" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 px-4 py-3 bg-slate-800/50 text-white border border-blue-800/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
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
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-medium shadow-lg shadow-blue-700/20"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-blue-200">Create Password</label>
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
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="w-4 h-4 border border-blue-600 rounded bg-slate-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-blue-200/70">
                        I agree to the <Link to="#" className="text-blue-400 hover:text-blue-300">Terms of Service</Link> and <Link to="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="w-1/3 py-3 px-4 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition duration-300"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-medium shadow-lg shadow-blue-700/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-blue-900/30 text-center">
          <div className="flex items-center justify-center space-x-1 text-sm text-blue-200/60">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            <span>Safe & Secure</span>
            <span className="mx-2">•</span>
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;