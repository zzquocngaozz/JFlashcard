import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const LogoutRoute = () => {
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    logout();
    const clearContext = async () => {
      try {
        const response = axios.post("/logout");
        await response;
      } catch (error) {
        console.log(error);
      }
    };
    clearContext();
  });

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default LogoutRoute;
