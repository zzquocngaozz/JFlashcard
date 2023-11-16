import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getWeekDate } from "../utils/datetimeCalc";

export default function useFetchRecent() {
  const [recent, setRecent] = useState({ classes: [], sets: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const recent = axios.get("/homepage", config);
        const weekTrackingDTO = getWeekDate(0);
        const staticLearn = axios.post(
          "/tracking/homepage",
          JSON.stringify(weekTrackingDTO),
          config
        );
        const response = await recent;
        const result = await staticLearn;
        setData(result.data.data);
        setRecent({
          classes: response?.data?.classRooms,
          sets: response?.data?.flashcardSets,
        });
        setLoading(false);
      } catch (error) {
        // TODO: navigate to not found or accessdenied
        setLoading(false);
        const errorCode = error?.response?.status;
        console.log(error?.message);
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
      }
    };

    fetch();
  }, []);

  const getWeekTracking = async (weekIndex, toggleLoading) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const weekTrackingDTO = getWeekDate(weekIndex);
      const staticLearn = await axios.post(
        "/tracking/homepage",
        JSON.stringify(weekTrackingDTO),
        config
      );
      setData(staticLearn.data.data);
    } catch (error) {
      // TODO: navigate to not found or accessdenied
      setLoading(false);
      const errorCode = error?.response?.status;
      console.log(error?.message);
      if (errorCode === 404) navigate("/not-found"); // not found
      if (errorCode === 401) navigate("/access-denied"); // not authorize
    }
  };

  return { recent, data, loading, getWeekTracking };
}
