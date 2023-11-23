import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getWeekDate } from "../utils/datetimeCalc";

export default function useFetchRecent() {
  const [recent, setRecent] = useState({ classes: [], sets: [] });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken, currentUser } = useAuth();
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
        const url =
          currentUser.role === 2
            ? "/homepage/dashboardteacher"
            : "/homepage/dashboardlearn";

        const staticLearn = axios.post(
          url,
          JSON.stringify(weekTrackingDTO),
          config
        );
        const response = await recent;
        const result = await staticLearn;
        setData(result.data);
        setRecent({
          classes: response?.data?.classRooms,
          sets: response?.data?.flashcardSets,
        });
        setLoading(false);
      } catch (error) {
        // TODO: navigate to not found or accessdenied
        setLoading(false);
        const errorCode = error?.response?.status;
        console.log(error);
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
      const url =
        currentUser.role === 2
          ? "/homepage/dashboardteacher"
          : "/homepage/dashboardlearn";

      const staticLearn = await axios.post(
        url,
        JSON.stringify(weekTrackingDTO),
        config
      );
      setData(staticLearn.data);
    } catch (error) {
      // TODO: navigate to not vscode-file://vscode-app/c:/Users/Admin/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlfound or accessdenied
      setLoading(false);
      const errorCode = error?.response?.status;
      console.log(error?.message);
      if (errorCode === 404) navigate("/not-found"); // not found
      if (errorCode === 401) navigate("/access-denied"); // not authorize
    }
  };

  return { recent, data, loading, getWeekTracking };
}
