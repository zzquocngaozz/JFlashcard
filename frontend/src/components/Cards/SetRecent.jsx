import styled from "@emotion/styled";
import {
  Avatar,
  Chip,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { getColorFromEnum } from "../../utils/colorGetter";
import { ROLE, SET_TYPE } from "../../utils/constant";
import { parseBirth } from "../../utils/datetimeCalc";

const SetRecent = ({ flashcardSet }) => {
  return (
    <StackCardLink to={`/${flashcardSet.flashcardSetId}/read`}>
      <Stack spacing={1}>
        <StackList>
          <FilterNoneIcon />
          <Typography variant="h5">{flashcardSet.title}</Typography>
        </StackList>
        <Chip label={SET_TYPE[flashcardSet.type]} sx={{ width: "100px" }} />
        <Tooltip>
          <StackList>
            <AccessTimeIcon />
            {/* <Typography>{parseBirth(flashcardSet.openAt)}</Typography> */}
            <Typography>{parseBirth(flashcardSet?.createdAt)}</Typography>
          </StackList>
        </Tooltip>
        <StackList>
          <NoteOutlinedIcon />
          <Typography>{flashcardSet.numberCard + " "} thẻ</Typography>
        </StackList>
      </Stack>
      <Tooltip title={`${flashcardSet.numberVote} người đã đánh giá`}>
        <StarHolderStack>
          <StarIcon sx={{ color: "#ff9800" }} />
          <Typography>
            {flashcardSet.votePoint + " "}({flashcardSet.numberVote})
          </Typography>
        </StarHolderStack>
      </Tooltip>
      <StackList>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: `${getColorFromEnum(flashcardSet?.authDTO?.userName[0])}`,
          }}
        >
          {flashcardSet?.authDTO?.userName.toUpperCase()[0]}
        </Avatar>
        <Typography>{flashcardSet?.authDTO?.userName + " "}</Typography>
        <Chip label={ROLE[flashcardSet?.authDTO?.role]} width={50} />
      </StackList>
    </StackCardLink>
  );
};
const StackCardLink = styled(Link)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "45%",
  height: "250px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "15px 20px",
  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.6), 0px 1px 1px 0px rgba(0,0,0,0.30), 0px 1px 3px 0px rgba(0,0,0,0.20)",
  },
});

const StackList = styled(Stack)({
  flexDirection: "row",
  columnGap: "15px",
  alignItems: "center",
});

const StarHolderStack = styled(Stack)({
  position: "absolute",
  top: "15px",
  right: "25px",
  flexDirection: "row",
  columnGap: "5px",
  alignItems: "center",
});

export default SetRecent;