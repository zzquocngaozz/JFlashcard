import { Stack, Typography } from "@mui/material";
import React from "react";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { StackList } from "./Styled/StyledStack";
const classRoom = [
  {
    classRoomName: "Lớp campus link FA22 HN",
    description: "",
    numberMember: 12,
    teacher: {
      userId: 3,
      userName: "hieuht01",
      role: 2,
    },
  },
  {
    classRoomName: "Mỗi ngày 10 từ vựng cùng Aki",
    description: "",
    numberMember: 1,
    teacher: {
      userId: 3,
      userName: "hieuht01",
      role: 2,
    },
  },
  {
    classRoomName: "Lớp campus link FA23 HN",
    description: "",
    numberMember: 1,
    teacher: {
      userId: 3,
      userName: "hieuht01",
      role: 2,
    },
  },
];

const TopClass = ({ classRoom: data }) => {
  return (
    <Stack sx={{ rowGap: "20px" }}>
      {classRoom ? (
        classRoom.map((clazz, index) => (
          <Stack key={index} className="container__theme">
            <StackList>
              <SchoolIcon />
              <Typography
                variant="h5"
                sx={{ width: "320" }}
                className="text--overflow"
              >
                {clazz?.classRoomName}
              </Typography>
            </StackList>
            <StackList>
              <PeopleIcon />
              <Typography>{clazz?.numberMember + " "} thành viên</Typography>
            </StackList>
          </Stack>
        ))
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default TopClass;
