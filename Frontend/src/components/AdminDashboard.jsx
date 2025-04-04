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
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { "x-auth-token": token },
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
          headers: { "x-auth-token": token },
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
        const res = await fetch("http://localhost:5000/api/spareParts");
        if (res.ok) {
          const data = await res.json();
          setSpareParts(data);
        } else {
          throw new Error("Failed to fetch spare parts");
        }
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        // Since your POST route doesn't require auth, we'll assume GET doesn't either
        // If it does require auth, uncomment the token and headers
        // const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/appointments" /*, {
          headers: { "x-auth-token": token },
        }*/);
        if (res.ok) {
          const data = await res.json();
          // Add a default status if not present in the schema
          const appointmentsWithStatus = data.map(appointment => ({
            ...appointment,
            status: appointment.status || "pending", // Default to "pending" if status isn't in DB
          }));
          setAppointments(appointmentsWithStatus);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchUsers();
    fetchSpareParts();
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const calculateTotalInventoryValue = () =>
    spareParts
      .reduce((total, part) => {
        const discountedPrice = part.discount
          ? part.price - part.price * (part.discount / 100)
          : part.price;
        return total + discountedPrice;
      }, 0)
      .toFixed(2);

  const getAveragePrice = () => {
    if (spareParts.length === 0) return 0;
    const total = spareParts.reduce((sum, part) => sum + part.price, 0);
    return (total / spareParts.length).toFixed(2);
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          method: "DELETE",
          headers: { "x-auth-token": token },
        });
        if (res.ok) {
          setAppointments(appointments.filter((appointment) => appointment._id !== id));
        } else {
          throw new Error("Failed to delete appointment");
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        );
        setAppointments(updatedAppointments);
      } else {
        throw new Error("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300">
            Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
            Cancelled
          </span>
        );
      case "completed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-300">
            Unknown
          </span>
        );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                title="Appointments"
                value={appointments.length}
                icon={<Calendar className="h-8 w-8 text-purple-500" />}
                bgColor="bg-purple-500/10"
                borderColor="border-purple-500/20"
              />
              <StatCard
                title="Inventory Value"
                value={`$${calculateTotalInventoryValue()}`}
                icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
                bgColor="bg-yellow-500/10"
                borderColor="border-yellow-500/20"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                user.isAdmin
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-blue-500/20 text-blue-300"
                              }`}
                            >
                              {user.isAdmin ? "Admin" : "User"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Upcoming Appointments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Workshop</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Time</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.slice(0, 5).map((appointment) => (
                        <tr key={appointment._id} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white">{appointment.name}</td>
                          <td className="py-3 px-4 text-white">{appointment.workshop}</td>
                          <td className="py-3 px-4 text-white">{formatDate(appointment.date)}</td>
                          <td className="py-3 px-4 text-white">{formatTime(appointment.time)}</td>
                          <td className="py-3 px-4">{getStatusBadge(appointment.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.isAdmin
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "appointments":
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">All Appointments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Phone</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Workshop</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-white">{appointment.name}</td>
                        <td className="py-3 px-4 text-white">{appointment.email}</td>
                        <td className="py-3 px-4 text-white">{appointment.phone}</td>
                        <td className="py-3 px-4 text-white">{appointment.workshop}</td>
                        <td className="py-3 px-4 text-white">{formatDate(appointment.date)}</td>
                        <td className="py-3 px-4 text-white">{formatTime(appointment.time)}</td>
                        <td className="py-3 px-4">{getStatusBadge(appointment.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-3">
                            {appointment.status !== "confirmed" && (
                              <button
                                className="text-green-400 hover:text-green-300 flex items-center"
                                onClick={() =>
                                  handleUpdateAppointmentStatus(appointment._id, "confirmed")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                              </button>
                            )}
                            {appointment.status !== "cancelled" && (
                              <button
                                className="text-red-400 hover:text-red-300 flex items-center"
                                onClick={() =>
                                  handleUpdateAppointmentStatus(appointment._id, "cancelled")
                                }
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                              </button>
                            )}
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteAppointment(appointment._id)}
                            >
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
                        ? part.price - part.price * (part.discount / 100)
                        : part.price;
                      return (
                        <tr key={part._id || index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white">{part.name}</td>
                          <td className="py-3 px-4 text-white">
                            {part.description && part.description.length > 50
                              ? `${part.description.substring(0, 50)}...`
                              : part.description || "-"}
                          </td>
                          <td className="py-3 px-4 text-white">
                            ${part.price ? part.price.toFixed(2) : "0.00"}
                          </td>
                          <td className="py-3 px-4 text-white">
                            {part.discount ? `${part.discount}%` : "-"}
                          </td>
                          <td className="py-3 px-4 text-white">
                            ${finalPrice ? finalPrice.toFixed(2) : "0.00"}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-400 hover:text-blue-300">Edit</button>
                              <button className="text-red-400 hover:text-red-300">Delete</button>
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
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-800"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
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
            icon={<Calendar />}
            text="Appointments"
            active={activeTab === "appointments"}
            onClick={() => setActiveTab("appointments")}
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
      <div className="flex-1 p-8 lg:pl-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "users" && "User Management"}
            {activeTab === "appointments" && "Appointment Management"}
            {activeTab === "analytics" && "Spare Parts Analytics"}
            {activeTab === "settings" && "Settings"}
          </h1>
          <p className="text-slate-400 mt-1">
            {activeTab === "appointments"
              ? "Manage and track all service appointments"
              : activeTab === "analytics"
              ? "Manage and analyze your spare parts inventory"
              : "Welcome to the admin panel"}
          </p>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <button
    className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition ${
      active
        ? "bg-blue-600/20 text-white border-r-4 border-blue-500"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`}
    onClick={onClick}
  >
    <span className="flex-shrink-0">
      {React.cloneElement(icon, {
        className: `h-5 w-5 ${active ? "text-blue-400" : "text-slate-400"}`,
      })}
    </span>
    <span className="font-medium">{text}</span>
  </button>
);

const StatCard = ({ title, value, icon, bgColor, borderColor }) => (
  <div
    className={`rounded-xl p-6 border ${borderColor} ${bgColor} flex items-center justify-between`}
  >
    <div>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
    <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">{icon}</div>
  </div>
);

export default AdminDashboard;