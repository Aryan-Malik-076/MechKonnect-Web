import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SparePartsPage from "./components/SparePartsPage";
import WorkshopPage from "./components/WorkshopPage";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import AppointmentPage from "./components/AppointmentPage";
import ReturnPolicy from "./components/ReturnPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import MechanicTrackingPage from "./components/MechanicTrackingPage";
import RequestPage from "./components/RequestPage";
import RoadsideAssistancePage from "./components/RoadsideAssistancePage";
import SmartKeyPage from "./components/SmartKeyPage";
import UpliftingPage from "./components/UpliftingPage";
import MobileWorkshopPage from "./components/MobileWorkshopPage";
import PaymentPage from "./components/PaymentPage";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

// Route Protection Components
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
const hideFooterPaths = ["/payment", "/mobile-workshop", "/uplifting", "/admin-dashboard","/", "/login", "/signup"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route path="/spare-parts" element={<SparePartsPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/appointments/:workshopId" element={<AppointmentPage />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/mechanic-tracking" element={<MechanicTrackingPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/roadside-assistance" element={<RoadsideAssistancePage />} />
          <Route path="/smart-key" element={<SmartKeyPage />} />
          <Route path="/uplifting" element={<UpliftingPage />} />
          <Route path="/mobile-workshop" element={<MobileWorkshopPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          
          {/* Admin Dashboard Route */}
          <Route 
            path="/admin-dashboard/*" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {/* Conditionally render Footer */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;