import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useLibClass = () => {
  const [listClass, setListClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const getSet = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(`/classroom/list`, config);
        setListClass(response.data);
        setLoading(false);
      } catch (error) {
        const errorCode = error.response.status;
        setLoading(false);
      }
    };
    getSet();
  }, []);
  return { loading, listClass };
};

export default useLibClass;
