import styled from "@emotion/styled";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { getColorFromEnum } from "../../utils/colorGetter";
import { ROLE } from "../../utils/constant";
import { parseBirth } from "../../utils/datetimeCalc";
import { StackCardLink, StackList } from "../Styled/StyledStack";
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
        <Typography>{clazz.teacher.userName + " "}</Typography>
        <Chip label={ROLE[clazz.teacher.role]} width={50} />
      </StackList>
    </StackCardLink>
  );
};

export default ClassSingle;
