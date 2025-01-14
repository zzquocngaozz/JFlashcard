import styled from "@emotion/styled";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import StarIcon from "@mui/icons-material/Star";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getColorFromEnum } from "../../utils/colorGetter";
import { ROLE, SET_TYPE } from "../../utils/constant";
import { parseBirth } from "../../utils/datetimeCalc";
import {
  ActionHolderStack,
  StackList,
  StarHolderStack,
} from "../Styled/StyledStack";

/**
 * Single Set trong folder
 *
 */
const SetFolder = ({ flashcardSet, onDelete }) => {
  return (
    <StackCardLink to={`/${flashcardSet?.flashcardSetId}/read`}>
      <Stack spacing={1}>
        <StackList>
          <FilterNoneIcon />
          <Typography variant="h5">{flashcardSet?.title}</Typography>
        </StackList>
        <Chip label={SET_TYPE[flashcardSet?.type]} sx={{ width: "100px" }} />
        <StackList>
          <NoteOutlinedIcon />
          <Typography>
            {flashcardSet?.numberCard + " "} thẻ flashcard
          </Typography>
        </StackList>
        <StackList>
          <AccessTimeIcon sx={{ color: "#079" }} />
          <Typography>{parseBirth(flashcardSet?.createdAt)}</Typography>
        </StackList>
      </Stack>
      <Tooltip title={`${flashcardSet?.numberVote} người đã đánh giá`}>
        <StarHolderStack>
          <StarIcon sx={{ color: "#ff9800" }} />
          <Typography>
            {flashcardSet?.votePoint + " "}({flashcardSet?.numberVote})
          </Typography>
        </StarHolderStack>
      </Tooltip>
      <Tooltip title={`Xoá khỏi thư mục`}>
        <ActionHolderStack>
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              onDelete(flashcardSet?.flashcardSetId);
            }}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </ActionHolderStack>
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
        <Chip label={ROLE[flashcardSet?.authDTO.role]} width={50} />
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

export default SetFolder;
