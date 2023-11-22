import React, { useEffect, useState } from "react";
import { StackList } from "../Styled/StyledStack";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { FLAG_STATUS } from "../../utils/constant";
import { countValues } from "../../utils/parseData";

const TeacherHomeHeader = ({ data: dashboard }) => {
  const [userData, setUserData] = useState({
    cardType: { numberKanji: 0, numberVocab: 0, numberGrammar: 0 },
    dataCard: {
      numberDraft: 0,
      numberDone: 0,
      numberPublic: 0,
      numberClose: 0,
    },
    setType: { numberKanji: 0, numberVocab: 0, numberGrammar: 0 },
    dataSet: {
      numberDraft: 0,
      numberDone: 0,
      numberPublic: 0,
      numberClose: 0,
    },
    countClass: 0,
    countMember: 0,
  });

  useEffect(() => {
    if (!dashboard) return;
    const { cardType, dataCard, countClass, countMember, dataSet, setType } =
      dashboard;
    console.log(Object.values(cardType), "Thẻ");
    console.log(Object.values(dataCard), "Thẻ status");
    console.log(Object.values(dataSet), "Set status");
    console.log(Object.values(setType), "Set type");
    setUserData({
      cardType: cardType,
      dataCard: dataCard,
      countClass: countClass,
      countMember: countMember,
      dataSet: dataSet,
      setType: setType,
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
            <Typography variant="h6">
              {userData?.countMember - userData?.countClass}
            </Typography>
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
            <Typography variant="h6">
              {countValues(...Object.values(userData?.cardType))}
            </Typography>
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
            <Typography variant="h6">
              {countValues(...Object.values(userData?.setType))}
            </Typography>
          </StackList>
        </Stack>
      </StackList>
    </StackList>
  );
};

export default TeacherHomeHeader;
