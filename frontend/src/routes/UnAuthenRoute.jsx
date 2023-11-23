import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// route chan nguoi dung chua dang nhap
const UnAuthenRoute = ({ path, children }) => {
  const { isLogin, currentUser } = useAuth();

  const location = useLocation();
  return (
    <>
      {!isLogin() ? (
        children
      ) : currentUser?.role === 3 ? (
        <Navigate to="/dashboard" state={{ from: location }} replace />
      ) : currentUser?.role === 4 ? (
        <Navigate to="/manager" state={{ from: location }} replace />
      ) : (
        <Navigate to="/home" state={{ from: location }} replace />
      )}
    </>
  );
};

export default UnAuthenRoute;
