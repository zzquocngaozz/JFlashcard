import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ClassContext = createContext({});

export const useClassContext = () => useContext(ClassContext);

export const useInitClassContext = () => {
  const context = useContext(ClassContext);
  const [loading, setLoading] = useState(true);
  const { classRoomId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getClassroom = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(`/classroom/${classRoomId}`, config);

        context.setClass(response.data);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error?.response?.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getClassroom();
  }, [classRoomId]);
  return { ...context, loading };
};

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
