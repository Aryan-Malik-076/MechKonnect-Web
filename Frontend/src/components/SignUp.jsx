import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 p-4">
      <div className="w-full max-w-md border border-slate-800 bg-slate-950/50 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="p-6 space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white">Create an account</h2>
          <p className="text-slate-400">Enter your information to get started</p>
        </div>

        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text", icon: <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" /> },
              { label: "Email", name: "email", type: "email", icon: <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" /> },
              { label: "Password", name: "password", type: "password", icon: <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" /> }
            ].map(({ label, name, type, icon }) => (
              <div key={name} className="space-y-2">
                <label htmlFor={name} className="block text-sm font-medium text-gray-400">{label}</label>
                <div className="relative">
                  {icon}
                  <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={label}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-2 bg-slate-900/50 text-white border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </form>
        </div>

        <div className="p-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>
            By creating an account, you agree to our <Link to="#" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link to="#" className="text-blue-500 hover:underline">Privacy Policy</Link>
          </p>
          <p className="mt-2">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
