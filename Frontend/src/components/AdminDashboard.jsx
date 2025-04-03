import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Home,
  LogOut,
  Settings,
  BarChart2,
  User,
  Shield,
  Menu,
  X,
  Wrench,
  ShoppingCart,
  DollarSign
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          throw new Error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchSpareParts = async () => {
      try {
        // Using the same endpoint as in your spare parts route
        const res = await fetch("http://localhost:5000/api/spareParts");
        
        if (res.ok) {
          const data = await res.json();
          setSpareParts(data);
        } else {
          throw new Error("Failed to fetch spare parts");
        }
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchUsers();
    fetchSpareParts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calculate total value of spare parts inventory
  const calculateTotalInventoryValue = () => {
    return spareParts.reduce((total, part) => {
      const discountedPrice = part.discount 
        ? part.price - (part.price * (part.discount / 100)) 
        : part.price;
      return total + discountedPrice;
    }, 0).toFixed(2);
  };

  // Get average price of spare parts
  const getAveragePrice = () => {
    if (spareParts.length === 0) return 0;
    const total = spareParts.reduce((sum, part) => sum + part.price, 0);
    return (total / spareParts.length).toFixed(2);
  };

  // Render different tabs
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Users"
                value={stats?.userCount || 0}
                icon={<Users className="h-8 w-8 text-blue-500" />}
                bgColor="bg-blue-500/10"
                borderColor="border-blue-500/20"
              />
              <StatCard
                title="Spare Parts"
                value={spareParts.length}
                icon={<Wrench className="h-8 w-8 text-green-500" />}
                bgColor="bg-green-500/10"
                borderColor="border-green-500/20"
              />
              <StatCard
                title="Inventory Value"
                value={`$${calculateTotalInventoryValue()}`}
                icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
                bgColor="bg-yellow-500/10"
                borderColor="border-yellow-500/20"
              />
            </div>
            
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map((user) => (
                      <tr key={user._id} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-white">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.isAdmin ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>
                            {user.isAdmin ? "Admin" : "User"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">All Users</h3>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-white">{user.name}</td>
                      <td className="py-3 px-4 text-white">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.isAdmin ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-400 hover:text-blue-300">
                            Edit
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Parts"
                value={spareParts.length}
                icon={<Wrench className="h-8 w-8 text-green-500" />}
                bgColor="bg-green-500/10"
                borderColor="border-green-500/20"
              />
              <StatCard
                title="Average Price"
                value={`$${getAveragePrice()}`}
                icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
                bgColor="bg-yellow-500/10"
                borderColor="border-yellow-500/20"
              />
              <StatCard
                title="Total Value"
                value={`$${calculateTotalInventoryValue()}`}
                icon={<ShoppingCart className="h-8 w-8 text-purple-500" />}
                bgColor="bg-purple-500/10"
                borderColor="border-purple-500/20"
              />
            </div>
            
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Spare Parts Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Discount</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Final Price</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spareParts.map((part, index) => {
                      const finalPrice = part.discount 
                        ? part.price - (part.price * (part.discount / 100)) 
                        : part.price;

                      return (
                        <tr key={part._id || index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white">{part.name}</td>
                          <td className="py-3 px-4 text-white">
                            {part.description && part.description.length > 50 
                              ? `${part.description.substring(0, 50)}...` 
                              : part.description || "-"}
                          </td>
                          <td className="py-3 px-4 text-white">${part.price ? part.price.toFixed(2) : "0.00"}</td>
                          <td className="py-3 px-4 text-white">
                            {part.discount ? `${part.discount}%` : "-"}
                          </td>
                          <td className="py-3 px-4 text-white">${finalPrice ? finalPrice.toFixed(2) : "0.00"}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-400 hover:text-blue-300">
                                Edit
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "settings":
        return <div>Settings Coming Soon</div>;
      default:
        return <div>Coming Soon</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-800"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 pt-4 pb-4">
          <SidebarItem
            icon={<Home />}
            text="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={<Users />}
            text="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <SidebarItem
            icon={<BarChart2 />}
            text="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <SidebarItem
            icon={<Settings />}
            text="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-white transition w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 lg:pl-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "users" && "User Management"}
            {activeTab === "analytics" && "Spare Parts Analytics"}
            {activeTab === "settings" && "Settings"}
          </h1>
          <p className="text-slate-400 mt-1">
            {activeTab === "analytics" 
              ? "Manage and analyze your spare parts inventory"
              : "Welcome to the admin panel"}
          </p>
        </header>

        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

// Helper Components
const SidebarItem = ({ icon, text, active, onClick }) => (
  <button
    className={`flex items-center space-x-3 w-full px-4 py-3 mb-1 ${
      active
        ? "bg-blue-600/10 text-blue-400 border-r-4 border-blue-500"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
    } transition`}
    onClick={onClick}
  >
    <span className="h-5 w-5">{icon}</span>
    <span>{text}</span>
  </button>
);

const StatCard = ({ title, value, icon, bgColor, borderColor }) => (
  <div className={`p-6 rounded-xl ${bgColor} border ${borderColor}`}>
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
      </div>
      <div>{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;