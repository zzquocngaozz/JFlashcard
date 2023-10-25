import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { StackContain } from "./Styled/Container";
import SetSkeleton from "./FeedBack/SetSkeleton";
import { StackList } from "./Styled/StyledStack";
import { Link } from "react-router-dom";
import SetSingle from "./Cards/SetSingle";
import searhbanner from "../assets/images/searhbanner.png";
import useFetchTopSet from "../hooks/useFetchTopSet";

const TopFlashcardSet = () => {
  const { topSet: sets, loading } = useFetchTopSet();

  return (
    <Stack>
      <StackList justifyContent={"space-between"}>
        <Typography variant="h6">
          Top 3 bộ flashcard có điểm cao nhất
        </Typography>
      </StackList>
      {!loading ? (
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

export default TopFlashcardSet;
