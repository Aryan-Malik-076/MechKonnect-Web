import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white text-black w-96 mx-auto mt-10 shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Payment Successful!</h2>
      <p className="text-lg">Your mechanic is on the way.</p>
      <button onClick={() => navigate("/")} className="bg-blue-500 text-white w-full p-2 mt-4 rounded-lg">
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
