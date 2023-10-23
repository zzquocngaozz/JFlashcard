import { Box, Skeleton, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { StackContain } from "./Styled/Container";
import { StackList } from "./Styled/StyledStack";
import ClassSkeleton from "./FeedBack/ClassSkeleton";
import { Link } from "react-router-dom";
import ClassSingle from "./Cards/ClassSingle";

const ClassHome = ({ classes, loading }) => {
  return (
    <>
      <StackList justifyContent={"space-between"}>
        <Typography variant="h6">Lớp học của bạn</Typography>
        {classes?.length >= 3 ? (
          <Box
            component={Link}
            sx={{ display: { xl: "none", sm: "block" }, mr: "15px" }}
            to="/my-lib/classes"
          >
            Xem toàn bộ
          </Box>
        ) : (
          <></>
        )}
      </StackList>
      {!loading ? (
        <StackContain>
          <ClassSkeleton />
          <ClassSkeleton />
          <ClassSkeleton />
        </StackContain>
      ) : (
        <StackContain>
          {classes.slice(0, 3).map((clazz) => (
            <ClassSingle key={clazz.classRoomId} clazz={clazz} />
          ))}
        </StackContain>
      )}
    </>
  );
};

export default ClassHome;
