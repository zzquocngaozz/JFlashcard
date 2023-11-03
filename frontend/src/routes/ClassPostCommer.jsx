import React from "react";
import { ClassPostProvider } from "../context/ClassPostContext";
import ClassContextProvider from "../context/ClassContext";

const ClassPostCommer = ({ children }) => {
  return (
    <ClassContextProvider>
      <ClassPostProvider>{children}</ClassPostProvider>
    </ClassContextProvider>
  );
};

export default ClassPostCommer;
