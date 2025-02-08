import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <div className="flex">
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
