import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useLearnHistory = () => {
  const [listSet, setListSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
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
        const response = await axios.get(`/homepage/listhistoryset`, config);
        setListSet(response.data);
        setLoading(false);
      } catch (error) {
        const errorCode = error?.response?.status;
        setLoading(false);
        navigate("/logout");
      }
    };
    getSet();
  }, []);
  return { loading, listSet };
};

export default useLearnHistory;
