import React, { useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useJoinClass = ({ setAlert }) => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const joinClass = async (data) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/classroom/joinclass",
        JSON.stringify(data),
        config
      );
      setAlert({
        open: true,
        severity: "success",
        message: "Vào lớp học thành công",
      });
      const url = `/class/${response.data.id}`;
      navigate(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        severity: "error",
        message: error.response?.data?.errors?.body[0],
      });
    }
  };

  return { loading, joinClass };
};

export default useJoinClass;
