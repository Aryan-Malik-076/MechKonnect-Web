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
} from "lucide-react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState(null); // To track which report to show
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

  const formatDate = (dateString) => (dateString ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(dateString)) : "N/A");

  const formatTime = (timeString) => (timeString ? new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "N/A");

  const formatTimestamp = (timestamp) => (timestamp ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(timestamp)) : "N/A");

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-500/20 text-green-300",
      pending: "bg-yellow-500/20 text-yellow-300",
      cancelled: "bg-red-500/20 text-red-300",
      completed: "bg-blue-500/20 text-blue-300",
      default: "bg-gray-500/20 text-gray-300",
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.default}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((appt) => formatDate(appt.date) === formatDate(today)).length;
  const todayPayments = payments.filter((pay) => formatDate(pay.timestamp) === formatDate(today)).length;

  const pieData = {
    labels: ["Appointments Today", "Parts Sold Today"],
    datasets: [{ data: [todayAppointments, todayPayments], backgroundColor: ["#10B981", "#F59E0B"], hoverBackgroundColor: ["#34D399", "#FBBF24"] }],
  };

  const barData = {
    labels: ["Workshops", "Spare Parts", "Appointments", "Payments"],
    datasets: [{ label: "Total", data: [workshops.length, spareParts.length, appointments.length, payments.length], backgroundColor: "#3B82F6", borderColor: "#2563EB", borderWidth: 1 }],
  };

  const lineData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Today"],
    datasets: [
      { label: "Appointments", data: [5, 10, 8, 15, todayAppointments], borderColor: "#10B981", tension: 0.4, fill: false },
      { label: "Payments", data: [3, 7, 5, 12, todayPayments], borderColor: "#F59E0B", tension: 0.4, fill: false },
    ],
  };

  const chartOptions = { responsive: true, plugins: { legend: { position: "top", labels: { color: "#E2E8F0" } }, tooltip: { backgroundColor: "#1E293B", titleColor: "#FFF", bodyColor: "#E2E8F0" } }, scales: { y: { beginAtZero: true, ticks: { color: "#E2E8F0" } }, x: { ticks: { color: "#E2E8F0" } } } };

  const generateReport = (type) => {
    setReportType(type);
  };

  const renderReport = () => {
    switch (reportType) {
      case "workshop":
        return (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Workshop Performance Report</h4>
            <Table 
              data={workshops} 
              columns={["Name", "Total Appointments"]} 
              renderRow={(workshop) => [
                workshop.name,
                appointments.filter(appt => appt.workshop === workshop.name).length
              ]} 
            />
          </div>
        );
      case "payment":
        return (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Payment Summary Report</h4>
            <Table 
              data={payments} 
              columns={["Product Name", "Price", "Date"]} 
              renderRow={(payment) => [
                payment.productName,
                `$${payment.productPrice.toFixed(2)}`,
                formatTimestamp(payment.timestamp)
              ]} 
            />
            <p className="mt-4 text-white">Total Revenue: ${payments.reduce((sum, payment) => sum + payment.productPrice, 0).toFixed(2)}</p>
          </div>
        );
      case "appointment":
        return (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Appointment Statistics Report</h4>
            <Table 
              data={appointments} 
              columns={["Workshop", "Date", "Status"]} 
              renderRow={(appt) => [
                appt.workshop,
                formatDate(appt.date),
                getStatusBadge(appt.status)
              ]} 
            />
            <p className="mt-4 text-white">Total Appointments: {appointments.length}</p>
            <p className="text-white">Confirmed: {appointments.filter(a => a.status === "confirmed").length}</p>
            <p className="text-white">Pending: {appointments.filter(a => a.status === "pending").length}</p>
            <p className="text-white">Cancelled: {appointments.filter(a => a.status === "cancelled").length}</p>
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
              <StatCard title="Total Workshops" value={workshops.length} icon={<Wrench className="h-8 w-8 text-blue-400" />} />
              <StatCard title="Spare Parts" value={spareParts.length} icon={<Wrench className="h-8 w-8 text-green-400" />} />
              <StatCard title="Appointments" value={appointments.length} icon={<Calendar className="h-8 w-8 text-purple-400" />} />
              <StatCard title="Total Payments" value={payments.length} icon={<CreditCard className="h-8 w-8 text-yellow-400" />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Workshops</h3>
                <Table data={workshops.slice(0, 5)} columns={["Name", "Description"]} renderRow={(workshop) => [workshop.name, workshop.description.length > 50 ? `${workshop.description.substring(0, 50)}...` : workshop.description]} />
              </div>
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Payments</h3>
                <Table data={payments.slice(0, 5)} columns={["Product", "Price", "Date"]} renderRow={(payment) => [payment.productName, `$${payment.productPrice.toFixed(2)}`, formatTimestamp(payment.timestamp)]} />
              </div>
            </div>
          </div>
        );
      case "workshops":
        return (
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">All Workshops</h3>
            </div>
            <Table 
              data={workshops} 
              columns={["Name", "Description"]} 
              renderRow={(workshop) => [
                workshop.name,
                workshop.description.length > 50 ? `${workshop.description.substring(0, 50)}...` : workshop.description
              ]} 
            />
          </div>
        );
      case "appointments":
        return (
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">All Appointments</h3>
            </div>
            <Table data={appointments} columns={["Name", "Email", "Phone", "Workshop", "Date", "Time", "Status", "Actions"]} renderRow={(appt) => [appt.name, appt.email, appt.phone, appt.workshop, formatDate(appt.date), formatTime(appt.time), getStatusBadge(appt.status), (
              <div className="flex space-x-3">
                {appt.status !== "confirmed" && <button className="text-green-400 hover:text-green-300" onClick={() => handleUpdateAppointmentStatus(appt._id, "confirmed")}><CheckCircle className="h-4 w-4" /></button>}
                {appt.status !== "cancelled" && <button className="text-red-400 hover:text-red-300" onClick={() => handleUpdateAppointmentStatus(appt._id, "cancelled")}><XCircle className="h-4 w-4" /></button>}
                <button className="text-red-400 hover:text-red-300" onClick={() => handleDeleteAppointment(appt._id)}>Delete</button>
              </div>
            )]} />
          </div>
        );
      case "spareparts":
        return (
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Spare Parts Inventory</h3>
            </div>
            <Table data={spareParts} columns={["Name", "Description", "Price", "Discount", "Final Price"]} renderRow={(part) => {
              const finalPrice = part.discount ? part.price * (1 - part.discount / 100) : part.price;
              return [part.name, part.description?.length > 50 ? `${part.description.substring(0, 50)}...` : part.description || "-", `$${part.price.toFixed(2)}`, part.discount ? `${part.discount}%` : "-", `$${finalPrice.toFixed(2)}`];
            }} />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard title="Total Parts" value={spareParts.length} icon={<Wrench className="h-8 w-8 text-green-400" />} />
              <StatCard title="Average Price" value={`$${getAveragePrice()}`} icon={<DollarSign className="h-8 w-8 text-yellow-400" />} />
              <StatCard title="Total Value" value={`$${calculateTotalInventoryValue()}`} icon={<ShoppingCart className="h-8 w-8 text-purple-400" />} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Today’s Activity</h3>
                <Pie data={pieData} options={chartOptions} />
              </div>
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Total Counts</h3>
                <Bar data={barData} options={chartOptions} />
              </div>
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">5-Day Trend</h3>
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">All Payments</h3>
            </div>
            <Table data={payments} columns={["Product Name", "Price", "Card Number", "Expiry", "CVV", "Timestamp"]} renderRow={(payment) => [payment.productName, `$${payment.productPrice.toFixed(2)}`, `**** **** **** ${payment.cardNumber.slice(-4)}`, payment.expiryDate, "***", formatTimestamp(payment.timestamp)]} />
          </div>
        );
      case "reports":
        return (
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6">Reports</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all">
                <div>
                  <h4 className="text-white font-medium">Workshop Performance</h4>
                  <p className="text-gray-400 text-sm">View workshop metrics</p>
                </div>
                <button onClick={() => generateReport("workshop")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Generate</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all">
                <div>
                  <h4 className="text-white font-medium">Payment Summary</h4>
                  <p className="text-gray-400 text-sm">Financial overview</p>
                </div>
                <button onClick={() => generateReport("payment")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Generate</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all">
                <div>
                  <h4 className="text-white font-medium">Appointment Statistics</h4>
                  <p className="text-gray-400 text-sm">Booking trends</p>
                </div>
                <button onClick={() => generateReport("appointment")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Generate</button>
              </div>
            </div>
            {renderReport()}
          </div>
        );
      default:
        return <div className="text-gray-400">Coming Soon</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex">
      <button className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-800 shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md"><Shield className="h-5 w-5 text-white" /></div>
            <span className="text-xl font-bold text-white">MechKonnect</span>
          </div>
        </div>
        <nav className="flex-1 py-4 space-y-2">
          {[
            { icon: <Home />, text: "Dashboard", tab: "dashboard" },
            { icon: <Wrench />, text: "Workshops", tab: "workshops" },
            { icon: <Calendar />, text: "Appointments", tab: "appointments" },
            { icon: <Wrench />, text: "Spare Parts", tab: "spareparts" },
            { icon: <BarChart2 />, text: "Analytics", tab: "analytics" },
            { icon: <CreditCard />, text: "Payments", tab: "payments" },
            { icon: <FileText />, text: "Reports", tab: "reports" },
          ].map((item) => (
            <SidebarItem key={item.tab} icon={item.icon} text={item.text} active={activeTab === item.tab} onClick={() => setActiveTab(item.tab)} />
          ))}
        </nav>
        <div className="p-6 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-300 hover:text-white transition w-full"><LogOut className="h-5 w-5" /><span>Logout</span></button>
        </div>
      </aside>
      <div className="flex-1 p-6 md:p-8">
        <header className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, " $1").trim() + " Management"}</h1>
          <p className="text-gray-300 mt-2">{activeTab === "workshops" ? "View workshops" : activeTab === "appointments" ? "Manage service appointments" : activeTab === "spareparts" ? "View inventory" : activeTab === "analytics" ? "Track performance" : activeTab === "payments" ? "Monitor transactions" : activeTab === "reports" ? "Generate reports" : "Welcome aboard!"}</p>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <button className={`flex items-center space-x-3 w-full px-6 py-3 text-left transition-all duration-200 ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700 hover:text-white"} rounded-lg mx-4`} onClick={onClick}>
    <span className={`flex-shrink-0 transition-transform duration-200 ${active ? "scale-110 text-blue-200" : "text-gray-400"}`}>{React.cloneElement(icon, { className: "h-5 w-5" })}</span>
    <span className="font-medium">{text}</span>
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-800/80 rounded-2xl p-6 shadow-lg flex items-center justify-between transition-all hover:shadow-xl hover:scale-105">
    <div>
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
    <div className="p-3 rounded-full bg-gray-700/50">{icon}</div>
  </div>
);

const Table = ({ data, columns, renderRow }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-700">
          {columns.map((col, idx) => <th key={idx} className="text-left py-4 px-4 text-gray-400 font-medium">{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-all">
            {renderRow(item).map((cell, i) => <td key={i} className="py-4 px-4 text-white">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;