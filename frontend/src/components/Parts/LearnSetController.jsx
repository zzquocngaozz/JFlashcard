import React from "react";
import { StackList } from "../Styled/StyledStack";
import { Box, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LearnSetController = ({ mutation, handlePrev, handleNext }) => {
  return (
    <StackList justifyContent={"center"} sx={{ gap: 10, pt: "10px" }}>
      <Box sx={{ width: 50, height: 50 }}>
        <IconButton onClick={handlePrev}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: 50, height: 50 }}>
        {mutation ? (
          <IconButton disabled={mutation}>
            <CircularProgress size={20} disableShrink />
          </IconButton>
        ) : (
          <IconButton onClick={handleNext} disabled={mutation}>
            <ArrowBackIcon sx={{ transform: "rotateY(180deg)" }} />
          </IconButton>
        )}
      </Box>
    </StackList>
  );
};

export default React.memo(LearnSetController);
