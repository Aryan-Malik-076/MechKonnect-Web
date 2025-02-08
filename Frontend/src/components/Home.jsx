import React from "react";
import NavBar from "./navbar";

const Home = () => {
  return (
    <><NavBar /><div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
    </div></>
  );
};

export default Home;
