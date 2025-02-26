// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SparePartsPage from "./components/SparePartsPage";
import WorkshopPage from "./components/WorkshopPage";
import RequestPage from "./components/RequestPage"; 
import RoadsideAssistancePage from "./components/RoadsideAssistancePage";
import SmartKeyPage from "./components/SmartKeyPage";
import UpliftingPage from "./components/UpliftingPage";
import MobileWorkshopPage from "./components/MobileWorkshopPage";
import PaymentPage from "./components/PaymentPage";
//import NotFoundPage from "./components/NotFoundPage"; // ✅ Handle unknown routes

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/spare-parts" element={<SparePartsPage />} />
            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/roadside-assistance" element={<RoadsideAssistancePage />} />
            <Route path="/smart-key" element={<SmartKeyPage />} />
            <Route path="/uplifting" element={<UpliftingPage />} />
            <Route path="/mobile-workshop" element={<MobileWorkshopPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* ✅ Redirect unknown routes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
