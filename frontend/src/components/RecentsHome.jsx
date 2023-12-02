import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { StackContain } from "./Styled/Container";
import SetSkeleton from "./FeedBack/SetSkeleton";
import { StackList } from "./Styled/StyledStack";
import { Link } from "react-router-dom";
import SetSingle from "./Cards/SetSingle";
import searhbanner from "../assets/images/searhbanner.png";

const RecentsHome = ({ sets, loading }) => {
  return (
    <Stack>
      <StackList justifyContent={"space-between"}>
        <Typography variant="h6">Những bộ flashcard bạn học gần đây</Typography>
        {sets?.length >= 3 ? (
          <Box
            component={Link}
            sx={{ display: { xl: "none", sm: "block" }, mr: "15px" }}
            to="/my-lib/recent"
          >
            Xem toàn bộ
          </Box>
        ) : (
          <></>
        )}
      </StackList>
      {loading ? (
        <StackContain>
          <SetSkeleton />
          <SetSkeleton />
          <SetSkeleton />
        </StackContain>
      ) : sets?.length === 0 ? (
        <Stack minHeight={300} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img src={searhbanner} loading="lazy" alt="notfound" />
          </Box>
          <Typography textAlign={"center"}>
            Lịch sử học trống! Hãy tìm kiếm hoặc tạo 1 bộ thẻ của riêng bạn và
            học ngay hôm nay
          </Typography>
        </Stack>
      ) : (
        <StackContain>
          {sets.slice(0, 3).map((set) => (
            <SetSingle key={set.flashcardSetId} flashcardSet={set} />
          ))}
        </StackContain>
      )}
    </Stack>
  );
};

export default RecentsHome;
