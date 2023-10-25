import React, { useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useCreateClass = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const createClass = async (data) => {
    setLoading(true);
    console.log(JSON.stringify(data));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    try {
      console.log(data);
      const response = await axios.post(
        "/classroom",
        JSON.stringify(data),
        config
      );
      const url = `/class/${response.data.id}`;
      navigate(url);
      //console.log(response.data)
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi");
    }
  };

  return { loading, createClass };
};

export default useCreateClass;
