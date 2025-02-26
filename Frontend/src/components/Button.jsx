import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
