import React, { useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAddSet = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const createSet = async (data) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    try {
      console.log(JSON.stringify(data));
      const response = await axios.post(
        "/createfls",
        JSON.stringify(data),
        config
      );

      const url = `/${response.data.id}/edit`;
      navigate(url);
    } catch (error) {
      setLoading(false);
    }
  };

  return { loading, createSet };
};

export default useAddSet;
