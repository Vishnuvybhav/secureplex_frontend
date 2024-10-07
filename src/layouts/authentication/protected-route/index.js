// ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "./auth"; // Import your auth function

export const isAuthenticated = () => {
    // Check if the access token exists in local storage
    return !!localStorage.getItem("accessToken");
  };

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated
  if (!isAuthenticated()) {
    // Redirect to the sign-in page if the user is not authenticated
    return <Navigate to="/authentication/sign-in" />;
  }

  // Render the children (the protected component) if authenticated
  return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // 'children' must be a React node
};

export default ProtectedRoute;
