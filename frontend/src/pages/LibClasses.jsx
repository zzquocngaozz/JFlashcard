import { Stack } from "@mui/material";
import React from "react";
import ClassSingle from "../components/Cards/ClassSingle";

const LibClasses = () => {
  const classList = [
    {
      classRoomId: 1,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      classRoomId: 2,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/8",
      teacher: {
        userId: 2,
        userName: "BanKai02",
        role: 2,
      },
    },
    {
      classRoomId: 3,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/7",
      teacher: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      classRoomId: 4,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 1,
        userName: "BanKai03",
        role: 2,
      },
    },
  ];

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        paddingTop:"20px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: "30px",
      }}
    >
      {classList.map((clazz) => (
        <ClassSingle key={clazz.classRoomId} clazz={clazz} />
      ))}
    </Stack>
  );
};

export default LibClasses;
