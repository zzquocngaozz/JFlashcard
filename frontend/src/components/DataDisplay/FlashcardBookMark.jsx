import { IconButton, Tooltip } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";
const FlashcardBookMark = () => {
  const { isBookMarked: data } = useFlashcardSetContext();
  const [isBookMarked, setIsBookMarked] = useState(data);
  const handleClick = () => {
    setIsBookMarked(!isBookMarked);
    // onChange(!isBookMarked);
    // TODO cho bo m 1 cai ham call api update bookmard o day
  };
  useEffect(() => {
    setIsBookMarked(data);
  }, [data]);
  console.log("ối zoi oi reload roi");
  return (
    <Tooltip title={isBookMarked ? "Bỏ đánh dấu" : " Đánh dấu"}>
      <IconButton onClick={handleClick}>
        <BookmarkIcon sx={{ color: `${isBookMarked ? "#ff9800" : ""}` }} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(FlashcardBookMark);
