import styled from "@emotion/styled";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from '@mui/icons-material/People';
import { getColorFromEnum } from "../../utils/colorGetter";
import { ROLE } from "../../utils/constant";
import {parseBirth} from '../../utils/datetimeCalc'
const ClassSingle = ({ clazz }) => {
  return (
    <StackCardLink to={"#"}>
      <Stack spacing={1}>
        <StackList>
          <SchoolIcon />
          <Typography variant="h5">{clazz.classRoomName}</Typography>
        </StackList>
        <StackList>
          <FilterNoneIcon />
          <Typography>{clazz.numberSet + " "} bộ flashcard</Typography>
        </StackList>
        <StackList>
          <PeopleIcon />
          <Typography>{clazz.numberStudent + " "} thành viên</Typography>
        </StackList>
        <StackList>
            <AccessTimeIcon sx={{ color: "#079" }} />
            <Typography>{parseBirth(clazz.createdAt)}</Typography>
        </StackList>
      </Stack>
      <StackList>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: `${getColorFromEnum(clazz.teacher?.userName[0])}`,
          }}
        >
          {clazz.teacher?.userName.toUpperCase()[0]}
        </Avatar>
        <Typography>
          {clazz.teacher.userName + " "}
        </Typography>
        <Chip label={ROLE[clazz.teacher.role]} width={50} />
      </StackList>
    </StackCardLink>
  );
};
const StackCardLink = styled(Link)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "45%",
  height: "250px",
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
  alignItems: "center"
});

export default ClassSingle;
