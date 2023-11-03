import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import ClassHome from "../components/ClassHome";
import RecentsHome from "../components/RecentsHome";
import useFetchRecent from "../hooks/useFetchRecent";

const Recents = () => {
  const { recent, loading } = useFetchRecent();

  useEffect(() => {
    document.title = "Trang chủ| JFlashcards";
  }, []);
  return (
    <>
      <Stack sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
        <RecentsHome sets={recent.sets} loading={loading} />
        <ClassHome classes={recent.classes} loading={loading} />
      </Stack>
    </>
  );
};

export default Recents;
