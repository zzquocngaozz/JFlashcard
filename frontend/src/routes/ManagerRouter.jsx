import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// route chan nguoi dung chua dang nhap
const ManagerRouter = ({ path, element }) => {
  const { isLogin, currentUser } = useAuth();
  // const { authUser } = useAuthContext();
  const location = useLocation();
  // console.log(authUser);

  return (
    <>
      {isLogin() && currentUser.role === 4 ? (
        element
      ) : (
        <Navigate to="/access-denied" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ManagerRouter;
