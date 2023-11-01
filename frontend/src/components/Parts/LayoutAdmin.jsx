import { Box, Stack } from "@mui/material";
import React from "react";
import SideNavAdmin from "./SideNavAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <Stack flexDirection="row" sx={{ width: "100%", height: "100vh" }}>
      <SideNavAdmin />
      <Box
        flex={10}
        sx={{
          padding: "2rem",
          overflowY: "scroll",
          bgcolor: "rgba(0,0,0,0.03)",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default LayoutAdmin;
