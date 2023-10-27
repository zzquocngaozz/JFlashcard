import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import SideNavAdmin from "../components/Parts/SideNavAdmin";
import LayoutAdmin from "../components/Parts/LayoutAdmin";

const Dashboard = () => {
  return (
    <LayoutAdmin>
      <Typography variant="h4">Dashboard</Typography>
      <br />
      <hr />
    </LayoutAdmin>
  );
};

export default Dashboard;
