import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const LogoutRoute = () => {
  const { logout, accessToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const clearContext = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      try {
        const response = await axios.post("/logout", "", config);
        logout();
      } catch (error) {
        console.log(error);
        logout();
      }
    };
    clearContext();
  });

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default LogoutRoute;
