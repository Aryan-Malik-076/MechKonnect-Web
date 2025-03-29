import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Get authentication and admin status from localStorage
  const token = localStorage.getItem('token');
  const adminStatus = localStorage.getItem('isAdmin');
  
  // Check if user is authenticated and is an admin
  const isAuthenticated = !!token;
  const isAdmin = adminStatus === 'true';

  // Redirect logic
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  // Return the protected children if checks pass
  return <>{children}</>;
};

export default AdminRoute;