import React, { createContext, useState } from "react";

const ClassContext = createContext({});

const ClassContextProvider = ({ children }) => {
  const [classroom, setClassroom] = useState({});
  return (
    <ClassContext.Provider value={{ classroom, setClassroom }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
