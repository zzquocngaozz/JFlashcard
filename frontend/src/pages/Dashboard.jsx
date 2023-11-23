import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SideNavAdmin from "../components/Parts/SideNavAdmin";
import LayoutAdmin from "../components/Parts/LayoutAdmin";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import AdminDashboardHeader from "../components/DataDisplay/AdminDashboardHeader";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      try {
        const response = await axios.get("/dashboard", config);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    startTransition(() => {
      fetchData();
    });
  }, []);

  return (
    <LayoutAdmin>
      {/* <Typography variant="h4">Dashboard</Typography>
      <br />
      <hr /> */}
      {isPending ? "Loading" : <AdminDashboardHeader data={data} />}
    </LayoutAdmin>
  );
};

export default Dashboard;
