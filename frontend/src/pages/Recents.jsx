import { Stack, Typography } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import ClassHome from "../components/ClassHome";
import RecentsHome from "../components/RecentsHome";
import useFetchRecent from "../hooks/useFetchRecent";

const Recents = () => {
  const { currentUser } = useAuth();
  const { recent, loading } = useFetchRecent();
  return (
    <>
      <Stack sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
        {/* <Typography variant="h5">
          Xin chào{" "}
          <span className="text--cap">
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </Typography> */}
        <RecentsHome sets={recent.sets} loading={loading} />
        <ClassHome classes={recent.classes} loading={loading} />
      </Stack>
    </>
  );
};

export default Recents;
