import React, { createContext, useContext, useState } from "react";

export const ClassContext = createContext({});

export const useClassContext = () => useContext(ClassContext);

export const ClassContextProvider = ({ children }) => {
  const [classroom, setClassroom] = useState({});
  return (
    <ClassContext.Provider value={{ classroom, setClassroom }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
