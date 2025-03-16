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

import RequestPage from "./components/RequestPage"; 
import RoadsideAssistancePage from "./components/RoadsideAssistancePage";
import SmartKeyPage from "./components/SmartKeyPage";
import UpliftingPage from "./components/UpliftingPage";
import MobileWorkshopPage from "./components/MobileWorkshopPage";
import PaymentPage from "./components/PaymentPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const hideFooterPaths = ["/payment", "/mobile-workshop", "/uplifting"];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/spare-parts" element={<SparePartsPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/request" element={<RequestPage />} />
          <Route path="/roadside-assistance" element={<RoadsideAssistancePage />} />
          <Route path="/smart-key" element={<SmartKeyPage />} />
          <Route path="/uplifting" element={<UpliftingPage />} />
          <Route path="/mobile-workshop" element={<MobileWorkshopPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
