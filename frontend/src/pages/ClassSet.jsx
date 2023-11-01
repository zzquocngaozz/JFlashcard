import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Stack, Typography } from "@mui/material";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import ClassNav from "../components/Parts/ClassNav";

const ClassSet = () => {
  const { classRoomId } = useParams();
  const [loading, setLoading] = useState(false);
  return (
    <LayoutNormal>
      <Stack p={3} pr={5} pl={5}>
        {loading ? (
          <BackdropLoading />
        ) : (
          <>
            <ClassNav />
            <Stack flexDirection={"row"} pt={3} sx={{ columnGap: "30px" }}>
              <Typography variant="h2">Các set trong lớp học</Typography>
            </Stack>
          </>
        )}
      </Stack>
    </LayoutNormal>
  );
};

export default ClassSet;
