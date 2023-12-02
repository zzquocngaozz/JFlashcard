import React, { useEffect, useState } from "react";
import { StackList } from "../Styled/StyledStack";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { countValues } from "../../utils/parseData";

const TeacherHomeHeader = ({ data: dashboard }) => {
  const [userData, setUserData] = useState({
    countCard: 0,
    countSet: 0,
    countClass: 0,
    countMember: 0,
  });

  useEffect(() => {
    console.log(dashboard);
    if (!dashboard) return;
    const { countCard, countClass, countFolder, countMember, countSet } =
      dashboard;
    setUserData({
      countCard: countCard,
      countSet: countSet,
      countClass: countClass,
      countMember: countMember,
    });
  }, [dashboard]);
  return (
    <StackList
      className="container__theme"
      sx={{
        height: "130px",
        justifyContent: "space-between",
        position: "relative",
        mb: "30px",
      }}
    >
      <StackList sx={{ width: "45%", height: "130px" }}>
        <Stack
          sx={{
            justifyContent: "center",
            width: "100%",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#86A789",
            color: "#FFF",
          }}
        >
          <StackList>
            <SchoolIcon />
            <Typography variant="h6" flex={1}>
              Lớp học
            </Typography>
            <Typography variant="h6">{userData?.countClass}</Typography>
          </StackList>
        </Stack>
      </StackList>
      <StackList sx={{ width: "45%", height: "130px" }}>
        <Stack
          sx={{
            justifyContent: "center",
            width: "100%",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#435585",
            color: "#FFF",
          }}
        >
          <StackList>
            <PeopleIcon />
            <Typography variant="h6" flex={1}>
              Số học sinh
            </Typography>
            <Typography variant="h6">{userData?.countMember}</Typography>
          </StackList>
        </Stack>
      </StackList>
      <StackList
        sx={{
          width: "45%",
          height: "100px",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            width: "100%",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#164863",
            color: "#FFF",
          }}
        >
          <StackList>
            <NoteOutlinedIcon />
            <Typography variant="h6" flex={1}>
              Số thẻ
            </Typography>
            <Typography variant="h6">{userData?.countCard}</Typography>
          </StackList>
        </Stack>
      </StackList>
      <StackList sx={{ width: "45%", height: "130px" }}>
        <Stack
          sx={{
            justifyContent: "center",
            width: "100%",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#363062",
            color: "#FFF",
          }}
        >
          <StackList>
            <FilterNoneIcon />
            <Typography variant="h6" flex={1}>
              Học phần
            </Typography>
            <Typography variant="h6">{userData?.countSet}</Typography>
          </StackList>
        </Stack>
      </StackList>
    </StackList>
  );
};

export default TeacherHomeHeader;
