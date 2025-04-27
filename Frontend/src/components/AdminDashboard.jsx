import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  LogOut,
  BarChart2,
  Shield,
  Menu,
  X,
  Wrench,
  ShoppingCart,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  CreditCard,
  FileText,
  Settings,
  Users,
  Bell,
  Search,
  Download,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const StatCard = ({ title, value, icon, trend, trendUp, bg }) => (
  <div className={`bg-gray-800 rounded-xl p-6 shadow-lg bg-gradient-to-br ${bg}`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className={`text-sm mt-2 flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
      {trendUp ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
      {trend}
    </p>
  </div>
);

const Table = ({ data, columns, renderRow }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs text-gray-400 uppercase bg-gray-700">
        <tr>
          {columns.map((col, index) => (
            <th key={index} scope="col" className="px-6 py-3">{col}</th>
          ))}
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const rowData = renderRow(item);
          return (
            <tr key={index} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
              {rowData.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">{cell}</td>
              ))}
              <td className="px-6 py-4">
                <div className="flex gap-2">
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
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New appointment request", time: "30 min ago", read: false },
    { id: 2, message: "Payment received", time: "2 hours ago", read: false },
    { id: 3, message: "Low inventory alert", time: "Yesterday", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/dashboard", { headers: { "x-auth-token": token } });
        if (res.ok) setStats(await res.json());
        else throw new Error("Failed to fetch dashboard data");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchWorkshops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/workshops");
        if (res.ok) setWorkshops(await res.json());
        else throw new Error("Failed to fetch workshops");
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    const fetchSpareParts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/spareParts");
        if (res.ok) setSpareParts(await res.json());
        else throw new Error("Failed to fetch spare parts");
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments");
        if (res.ok) {
          const data = await res.json();
          setAppointments(data.map((appointment) => ({ ...appointment, status: appointment.status || "pending" })));
        } else throw new Error("Failed to fetch appointments");
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payments");
        if (res.ok) setPayments(await res.json());
        else throw new Error("Failed to fetch payments");
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchWorkshops();
    fetchSpareParts();
    fetchAppointments();
    fetchPayments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const calculateTotalInventoryValue = () =>
    spareParts.reduce((total, part) => total + (part.discount ? part.price * (1 - part.discount / 100) : part.price), 0).toFixed(2);

  const getAveragePrice = () => (spareParts.length ? (spareParts.reduce((sum, part) => sum + part.price, 0) / spareParts.length).toFixed(2) : 0);

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
        if (res.ok) setAppointments(appointments.filter((appointment) => appointment._id !== id));
        else throw new Error("Failed to delete appointment");
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
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setAppointments(appointments.map((appt) => (appt._id === id ? { ...appt, status } : appt)));
      else throw new Error("Failed to update appointment status");
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const formatDate = (dateString) => (dateString ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(dateString)) : "N/A");

  const formatTime = (timeString) => (timeString ? new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "N/A");

  const formatTimestamp = (timestamp) => (timestamp ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(timestamp)) : "N/A");

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      cancelled: "bg-red-500 text-white",
      completed: "bg-blue-500 text-white",
      default: "bg-gray-500 text-white",
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.default}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((appt) => formatDate(appt.date) === formatDate(today)).length;
  const todayPayments = payments.filter((pay) => formatDate(pay.timestamp) === formatDate(today)).length;
  const unreadNotifications = notifications.filter(notif => !notif.read).length;
  
  const currentMonth = new Date().getMonth();
  const monthlyRevenue = payments
    .filter(payment => new Date(payment.timestamp).getMonth() === currentMonth)
    .reduce((sum, payment) => sum + payment.productPrice, 0);

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const weeklyAppointments = appointments.filter(appt => new Date(appt.date) >= startOfWeek).length;

  const pieData = {
    labels: ["Confirmed", "Pending", "Cancelled", "Completed"],
    datasets: [{ 
      data: [
        appointments.filter(a => a.status === "confirmed").length,
        appointments.filter(a => a.status === "pending").length,
        appointments.filter(a => a.status === "cancelled").length,
        appointments.filter(a => a.status === "completed").length
      ], 
      backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6"], 
      hoverBackgroundColor: ["#34D399", "#FBBF24", "#F87171", "#60A5FA"] 
    }],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { 
        label: "Appointments", 
        data: [5, 7, 10, 8, 12, 3, 2], 
        backgroundColor: "#3B82F6"
      },
      { 
        label: "Sales", 
        data: [3, 4, 8, 6, 9, 2, 1], 
        backgroundColor: "#10B981"
      }
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { 
        label: "Revenue", 
        data: [4200, 5800, 4900, 6500, 7200, monthlyRevenue], 
        borderColor: "#10B981", 
        tension: 0.4, 
        fill: false 
      },
      { 
        label: "Expenses", 
        data: [3200, 4100, 3400, 4800, 5100, 5400], 
        borderColor: "#F59E0B", 
        tension: 0.4, 
        fill: false 
      },
    ],
  };

  const chartOptions = { 
    responsive: true, 
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: "top", 
        labels: { 
          color: "#E2E8F0",
          boxWidth: 12,
          padding: 15
        } 
      }, 
      tooltip: { 
        backgroundColor: "#1E293B", 
        titleColor: "#FFF", 
        bodyColor: "#E2E8F0",
        padding: 12,
        cornerRadius: 8
      } 
    }, 
    scales: { 
      y: { 
        beginAtZero: true, 
        grid: {
          color: "#334155",
          drawBorder: false,
        },
        ticks: { 
          color: "#94A3B8" 
        } 
      }, 
      x: { 
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: { 
          color: "#94A3B8" 
        } 
      } 
    } 
  };

  const generateReport = (type) => {
    setReportType(type);
  };

  const renderReport = () => {
    switch (reportType) {
      case "workshop":
        return (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Workshop Performance Report</h4>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <Download size={16} />
                Export Report
              </button>
            </div>
            <Table 
              data={workshops} 
              columns={["Name", "Total Appointments", "Performance"]} 
              renderRow={(workshop) => [
                workshop.name,
                appointments.filter(appt => appt.workshop === workshop.name).length,
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, appointments.filter(appt => appt.workshop === workshop.name).length * 5)}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-400">{Math.min(100, appointments.filter(appt => appt.workshop === workshop.name).length * 5)}%</span>
                </div>
              ]} 
            />
          </div>
        );
      case "payment":
        return (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Payment Summary Report</h4>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <Download size={16} />
                Export Report
              </button>
            </div>
            <Table 
              data={payments} 
              columns={["Product Name", "Price", "Date", "Status"]} 
              renderRow={(payment) => [
                payment.productName,
                `$${payment.productPrice.toFixed(2)}`,
                formatTimestamp(payment.timestamp),
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Completed</span>
              ]} 
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-white text-xl font-bold">${payments.reduce((sum, payment) => sum + payment.productPrice, 0).toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Average Transaction</p>
                <p className="text-white text-xl font-bold">${(payments.reduce((sum, payment) => sum + payment.productPrice, 0) / (payments.length || 1)).toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
                <p className="text-white text-xl font-bold">{payments.length}</p>
              </div>
            </div>
          </div>
        );
      case "appointment":
        return (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Appointment Statistics Report</h4>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <Download size={16} />
                Export Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Total</p>
                <p className="text-white text-xl font-bold">{appointments.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Confirmed</p>
                <p className="text-green-400 text-xl font-bold">{appointments.filter(a => a.status === "confirmed").length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Pending</p>
                <p className="text-yellow-400 text-xl font-bold">{appointments.filter(a => a.status === "pending").length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Cancelled</p>
                <p className="text-red-400 text-xl font-bold">{appointments.filter(a => a.status === "cancelled").length}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl mb-6">
              <h5 className="text-white font-medium mb-4">Status Distribution</h5>
              <div className="h-64">
                <Pie data={pieData} options={{...chartOptions, plugins: {...chartOptions.plugins, legend: {...chartOptions.plugins.legend, position: 'right'}}}} />
              </div>
            </div>
            <Table 
              data={appointments} 
              columns={["Workshop", "Date", "Customer", "Status"]} 
              renderRow={(appt) => [
                appt.workshop,
                formatDate(appt.date),
                appt.name,
                getStatusBadge(appt.status)
              ]} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Monthly Revenue" 
                value={`$${monthlyRevenue.toFixed(2)}`} 
                icon={<DollarSign className="h-6 w-6 text-green-400" />} 
                trend="+12%" 
                trendUp={true}
                bg="from-green-600/20 to-green-500/5"
              />
              <StatCard 
                title="Weekly Appointments" 
                value={weeklyAppointments} 
                icon={<Calendar className="h-6 w-6 text-blue-400" />} 
                trend="+5%" 
                trendUp={true}
                bg="from-blue-600/20 to-blue-500/5"
              />
              <StatCard 
                title="Inventory Value" 
                value={`$${calculateTotalInventoryValue()}`} 
                icon={<ShoppingCart className="h-6 w-6 text-purple-400" />} 
                trend="-3%" 
                trendUp={false}
                bg="from-purple-600/20 to-purple-500/5"
              />
              <StatCard 
                title="Active Workshops" 
                value={workshops.length} 
                icon={<Wrench className="h-6 w-6 text-yellow-400" />} 
                trend="Stable" 
                bg="from-yellow-600/20 to-yellow-500/5"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-400" />
                    Revenue Trends
                  </h3>
                </div>
                <div className="p-6 h-80">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <BarChart2 size={18} className="text-blue-400" />
                    Weekly Activity
                  </h3>
                </div>
                <div className="p-6 h-80">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-blue-400" />
                    Recent Appointments
                  </h3>
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <Table 
                    data={appointments.slice(0, 5)} 
                    columns={["Customer", "Workshop", "Date", "Time", "Status"]} 
                    renderRow={(appt) => [
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          {appt.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{appt.name}</p>
                          <p className="text-xs text-gray-400">{appt.email}</p>
                        </div>
                      </div>,
                      appt.workshop,
                      formatDate(appt.date),
                      formatTime(appt.time),
                      getStatusBadge(appt.status)
                    ]} 
                  />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlertCircle size={18} className="text-blue-400" />
                    Alerts
                  </h3>
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition">View All</button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Low inventory alert</p>
                      <p className="text-xs text-gray-400">5 items below threshold</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Pending appointments</p>
                      <p className="text-xs text-gray-400">3 require confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                      <Bell size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">System update available</p>
                      <p className="text-xs text-gray-400">Version 2.4.1 is ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "workshops":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Wrench size={18} className="text-blue-400" />
                Workshop Management
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search workshops..." 
                    className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2">
                  <span>Add Workshop</span>
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops
                  .filter(workshop => workshop.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((workshop, index) => (
                    <div key={index} className="bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition">
                      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                          <h4 className="text-white font-semibold text-lg">{workshop.name}</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-300 text-sm mb-3">
                          {workshop.description.length > 80 
                            ? `${workshop.description.substring(0, 80)}...` 
                            : workshop.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            {appointments.filter(appt => appt.workshop === workshop.name).length} appointments
                          </span>
                          <button className="text-sm text-blue-400 hover:text-blue-300 transition">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      case "appointments":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar size={18} className="text-blue-400" />
                Appointment Management
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search appointments..." 
                    className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">Today</button>
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">All</button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total</p>
                  <p className="text-white text-xl font-bold">{appointments.length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Confirmed</p>
                  <p className="text-green-400 text-xl font-bold">{appointments.filter(a => a.status === "confirmed").length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Pending</p>
                  <p className="text-yellow-400 text-xl font-bold">{appointments.filter(a => a.status === "pending").length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Cancelled</p>
                  <p className="text-red-400 text-xl font-bold">{appointments.filter(a => a.status === "cancelled").length}</p>
                </div>
              </div>
              <Table
                data={appointments.filter(appt => 
                  appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  appt.workshop.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                columns={["Customer", "Workshop", "Date", "Time", "Status"]}
                renderRow={(appt) => [
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {appt.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{appt.name}</p>
                      <p className="text-xs text-gray-400">{appt.email}</p>
                    </div>
                  </div>,
                  appt.workshop,
                  formatDate(appt.date),
                  formatTime(appt.time),
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appt.status)}
                    <select
                      value={appt.status}
                      onChange={(e) => handleUpdateAppointmentStatus(appt._id, e.target.value)}
                      className="bg-gray-700 text-white border-none rounded-md text-xs p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>,
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteAppointment(appt._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ]}
              />
            </div>
          </div>
        );
      case "spareParts":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShoppingCart size={18} className="text-blue-400" />
                Spare Parts Inventory
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spare parts..."
                    className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2">
                  <span>Add Spare Part</span>
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Items</p>
                  <p className="text-white text-xl font-bold">{spareParts.length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Value</p>
                  <p className="text-white text-xl font-bold">${calculateTotalInventoryValue()}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Average Price</p>
                  <p className="text-white text-xl font-bold">${getAveragePrice()}</p>
                </div>
              </div>
              <Table
                data={spareParts.filter(part => part.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                columns={["Name", "Price", "Discount", "Stock"]}
                renderRow={(part) => [
                  part.name,
                  `$${part.price.toFixed(2)}`,
                  part.discount ? `${part.discount}%` : "N/A",
                  part.stock || "N/A",
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                ]}
              />
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard size={18} className="text-blue-400" />
                Payment Management
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                  <p className="text-white text-xl font-bold">${payments.reduce((sum, payment) => sum + payment.productPrice, 0).toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Average Transaction</p>
                  <p className="text-white text-xl font-bold">${(payments.reduce((sum, payment) => sum + payment.productPrice, 0) / (payments.length || 1)).toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
                  <p className="text-white text-xl font-bold">{payments.length}</p>
                </div>
              </div>
              <Table
                data={payments.filter(payment => payment.productName.toLowerCase().includes(searchTerm.toLowerCase()))}
                columns={["Product Name", "Price", "Date", "Status"]}
                renderRow={(payment) => [
                  payment.productName,
                  `$${payment.productPrice.toFixed(2)}`,
                  formatTimestamp(payment.timestamp),
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Completed</span>,
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">View</button>
                  </div>
                ]}
              />
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                Reports
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => generateReport("workshop")}
                  className="bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition"
                >
                  <p className="text-white font-medium">Workshop Performance</p>
                  <p className="text-gray-400 text-sm mt-1">Analyze workshop efficiency and appointments</p>
                </button>
                <button
                  onClick={() => generateReport("payment")}
                  className="bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition"
                >
                  <p className="text-white font-medium">Payment Summary</p>
                  <p className="text-gray-400 text-sm mt-1">View financial transactions and revenue</p>
                </button>
                <button
                  onClick={() => generateReport("appointment")}
                  className="bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition"
                >
                  <p className="text-white font-medium">Appointment Statistics</p>
                  <p className="text-gray-400 text-sm mt-1">Track appointment trends and statuses</p>
                </button>
              </div>
              {renderReport()}
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users size={18} className="text-blue-400" />
                User Management
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white border-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2">
                  <span>Add User</span>
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <Table
                data={[]} // Placeholder for user data
                columns={["Name", "Email", "Role", "Status"]}
                renderRow={(user) => [
                  user.name || "N/A",
                  user.email || "N/A",
                  user.role || "N/A",
                  user.status || "N/A",
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                ]}
              />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Settings size={18} className="text-blue-400" />
                Settings
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">General Settings</h4>
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <label className="block text-sm text-gray-400 mb-2">Business Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-600 rounded-lg p-2 text-white border-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter business name"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Notification Preferences</h4>
                  <div className="bg-gray-700 p-4 rounded-xl space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox text-blue-500" />
                      <span className="text-gray-300 text-sm">Email notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox text-blue-500" />
                      <span className="text-gray-300 text-sm">SMS notifications</span>
                    </label>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "workshops", icon: Wrench, label: "Workshops" },
            { id: "appointments", icon: Calendar, label: "Appointments" },
            { id: "spareParts", icon: ShoppingCart, label: "Spare Parts" },
            { id: "payments", icon: CreditCard, label: "Payments" },
            { id: "reports", icon: FileText, label: "Reports" },
            { id: "users", icon: Users, label: "Users" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-sm text-gray-300 hover:bg-gray-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-white">
              <Menu size={24} />
            </button>
            <h2 className="text-white text-lg font-semibold capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="text-gray-300 hover:text-white relative"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-white text-sm font-medium">Notifications</h3>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-blue-400 text-xs hover:text-blue-300"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-700 ${
                          notif.read ? "bg-gray-800" : "bg-gray-700"
                        }`}
                      >
                        <p className="text-white text-sm">{notif.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                A
              </div>
              <span className="text-white text-sm">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;