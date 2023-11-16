import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSearchPublic() {
  const [listSet, setListSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const searchPublic = async (q) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const url = `/search?q=${q}`;
      const response = await axios.get(url, config);
      setListSet(response.data);
      setSearching(true);
      setLoading(false);
    } catch (error) {
      // TODO: navigate to not found or accessdenied
      setLoading(false);
      const errorCode = error?.response?.status;
      console.log(errorCode);
      if (errorCode === 404) navigate("/not-found"); // not found
      if (errorCode === 401) navigate("/access-denied"); // not authorize
    }
  };

  return { listSet, loading, searching, searchPublic };
}
