import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { parseBirth } from "../../utils/datetimeCalc";
const FolderSingle = ({ folder }) => {
  return (
    <StackCardLink to={"#"}>
      <Stack spacing={1}>
        <StackList>
          <FolderOpenIcon />
          <Typography variant="h5">{folder.title}</Typography>
        </StackList>
        <StackList>
          <FilterNoneIcon />
          <Typography>{folder.numberSet + " "} bộ flashcard</Typography>
        </StackList>
      </Stack>
      <StackList>
        <AccessTimeIcon sx={{ color: "#079" }} />
        <Typography>{parseBirth(folder.createdAt)}</Typography>
      </StackList>
    </StackCardLink>
  );
};
const StackCardLink = styled(Link)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "45%",
  height: "180px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "15px 20px",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
});

export default FolderSingle;
