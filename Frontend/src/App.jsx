// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SparePartsPage from "./components/SparePartsPage";
import WorkshopPage from "./components/WorkshopPage";
import RequestPage from "./components/RequestPage"; // Import the new RequestPage component
import RoadsideAssistancePage from "./components/RoadsideAssistancePage"; 
import SmartKeyPage from "./components/SmartKeyPage";
import UpliftingPage from "./components/UpliftingPage";
import MobileWorkshopPage from "./components/MobileWorkshopPage";

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
            <Route path="/spare-parts" element={<SparePartsPage />} /> {/* Route for all spare parts */}
            <Route path="/workshop" element={<WorkshopPage />} /> {/* Route for all workshops */}
            <Route path="/request" element={<RequestPage />} /> {/* Route for the request page */}
            <Route path="/roadside-assistance" element={<RoadsideAssistancePage />} />
            <Route path="/smart-key" element={<SmartKeyPage />} />
            <Route path="/uplifting" element={<UpliftingPage />} />
            <Route path="/mobile-workshop" element={<MobileWorkshopPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;