import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthoRoute = ({ path, element, role }) => {
  const { isLogin, currentUser } = useAuth();
  const location = useLocation();

  return (
    <>
      {isLogin() && currentUser?.role === role ? (
        element
      ) : (
        <Navigate to="/access-denied" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AuthoRoute;
