import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userType = decoded.userType;

    if (!allowedRoles.includes(userType)) {
      // If userType is not in allowedRoles, redirect to a not authorized page or homepage
      return <Navigate to="/not-authorized" />;
    }

    // If everything is fine, render the requested component
    return <Component {...rest} />;
  } catch (error) {
    // If there's an error decoding the token, redirect to login
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
