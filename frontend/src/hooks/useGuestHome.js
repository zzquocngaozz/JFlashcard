import axios from "axios";
import React, { useEffect, useState } from "react";

const useGuestHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let response = await axios.get("", config);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { loading, data };
};

export default useGuestHome;
