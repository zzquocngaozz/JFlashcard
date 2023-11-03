import React, { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";

export const ClassContext = createContext({});

export const useClassContext = () => useContext(ClassContext);

export const ClassContextProvider = ({ children }) => {
  const [classroom, setClass] = useState({});
  const { currentUser } = useAuth();
  const isClassAdmin = () => classroom?.teacher?.userId === currentUser?.userId;
  return (
    <ClassContext.Provider value={{ classroom, setClass, isClassAdmin }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
