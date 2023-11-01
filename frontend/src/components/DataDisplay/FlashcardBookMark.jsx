import { IconButton, Tooltip } from "@mui/material";
import React, { memo } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";
const FlashcardBookMark = () => {
  const {
    isBookMarked: data,
    handleToggleBookMarked: onChannge,
    mutation,
  } = useFlashcardSetContext();
  const handleClick = () => {
    onChannge(!data);
    // onChange(!isBookMarked);
    // TODO cho bo m 1 cai ham call api update bookmard o day
  };
  return (
    <Tooltip title={data ? "Bỏ đánh dấu" : " Đánh dấu"}>
      <IconButton onClick={handleClick} disabled={mutation}>
        <BookmarkIcon sx={{ color: `${data ? "#ff9800" : ""}` }} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(FlashcardBookMark);
