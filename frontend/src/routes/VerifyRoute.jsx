import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

// route chan nguoi dung chua dang nhap
const VerifyRoute = ({ path, element }) => {
  const { isLogin, currentUser } = useAuth();
  const location = useLocation();

  return (
    <>
      {!isLogin() ? (
        <Navigate to="/access-denied" state={{ from: location }} replace />
      ) : currentUser.verify ? (
        element
      ) : (
        <Navigate to="/profile" state={{ from: location }} replace />
      )}
    </>
  );
};

export default VerifyRoute;
