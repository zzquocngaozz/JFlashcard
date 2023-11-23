import React, { useEffect, useState } from "react";
import { StackList } from "../Styled/StyledStack";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { Divider, Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { countValues } from "../../utils/parseData";

const AdminDashboardHeader = ({ data: dashboard }) => {
  const [userData, setUserData] = useState({
    numberFLCard: [0, 0, 0],
    numberClass: 0,
    numberUser: [0, 0, 0, 0],
  });

  useEffect(() => {
    if (!dashboard) return;
    const { numberFLCard, numberClass, numberUser } = dashboard;
    setUserData({
      numberFLCard: numberFLCard,
      numberClass: numberClass,
      numberUser: numberUser,
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
      <StackList sx={{ width: "30%", height: "130px" }}>
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
          </StackList>
          <Typography variant="h6">{userData?.numberClass}</Typography>
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
          <StackList justifyContent={"space-between"}>
            <Stack>
              <StackList alignItems={"center"}>
                <PeopleIcon />
                <Typography variant="h6" flex={1}>
                  Người dùng
                </Typography>
              </StackList>
              <Typography variant="h6">
                {userData?.numberUser[0] + userData?.numberUser[1]}
              </Typography>
            </Stack>
            <Stack sx={{ rowGap: "5px" }}>
              <Typography>{userData?.numberUser[0] + " học sinh"}</Typography>

              <Typography>{userData?.numberUser[1] + " giáo viên"}</Typography>
            </Stack>
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
            rowGap: "10px",
          }}
        >
          <StackList>
            <NoteOutlinedIcon />
            <Typography variant="h6" flex={1}>
              Số học phần
            </Typography>
            <Typography variant="h6">
              {countValues(...userData?.numberFLCard)}
            </Typography>
          </StackList>
          <StackList justifyContent={"space-between"}>
            <Typography>{userData?.numberFLCard[0] + " Hán tự"}</Typography>
            <Divider
              variant="middle"
              sx={{ borderColor: "#FFF" }}
              orientation="vertical"
            />
            <Typography>{userData?.numberFLCard[1] + " Từ vựng"}</Typography>
            <Divider
              variant="middle"
              sx={{ borderColor: "#FFF" }}
              orientation="vertical"
            />
            <Typography>{userData?.numberFLCard[2] + " Ngữ pháp"}</Typography>
          </StackList>
        </Stack>
      </StackList>
    </StackList>
  );
};

export default AdminDashboardHeader;
