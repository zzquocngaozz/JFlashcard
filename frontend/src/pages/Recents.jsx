import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import ClassHome from "../components/ClassHome";
import RecentsHome from "../components/RecentsHome";
import useFetchRecent from "../hooks/useFetchRecent";
import UserHomeChart from "../components/DataDisplay/UserHomeChart";
import useAuth from "../hooks/useAuth";
import TeacherHomeHeader from "../components/DataDisplay/TeacherHomeHeader";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

const Recents = () => {
  const { recent, data, loading, getWeekTracking } = useFetchRecent();
  const { currentUser } = useAuth();
  useEffect(() => {
    document.title = "Trang chủ| JFlashcards";
  }, []);
  return (
    <>
      <Stack sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
        {loading ? (
          <BackdropLoading />
        ) : currentUser.role !== 2 ? (
          <>
            <UserHomeChart data={data} getWeekTracking={getWeekTracking} />
            <RecentsHome sets={recent.sets} loading={loading} />
            <ClassHome classes={recent.classes} loading={loading} />
          </>
        ) : currentUser.role === 2 ? (
          <>
            <TeacherHomeHeader data={data} />
            <ClassHome classes={recent.classes} loading={loading} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

export default Recents;
