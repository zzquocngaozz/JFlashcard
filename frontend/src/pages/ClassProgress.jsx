import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Box } from "@mui/material";
import HorizontalBarChart from "../components/DataDisplay/HorizontalBarChart";
import { StackList } from "../components/Styled/StyledStack";
import OverallLearnProgress from "../components/DataDisplay/OverallLearnProgress";

const ClassProgress = () => {
  const { setId } = useParams();
  const [learnProgress, setLearnProgress] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLearnProgress({
        flashcardSetId: 1,
        title: "Kanji bộ thuỷ",
        startDate: new Date("2023-10-31").getTime(), // ngày bộ thẻ đuoc gan vao lop học
        dueDate: new Date("2023-11-07").getTime(),
        numberCards: 60,
        data: [
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 1,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 2,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
        ],
      });
    }, 1000);
  }, []);

  return (
    <LayoutNormal>
      Hello world {setId}
      <StackList sx={{ flexDirection: "row" }}>
        <Box
          width={"28%"}
          height={"100%"}
          margin={"0 auto"}
          className={"container__theme"}
        >
          <OverallLearnProgress />
        </Box>
        <Box width={"70%"} margin={"0 auto"} className={"container__theme"}>
          <HorizontalBarChart learnProgress={learnProgress} />
        </Box>
      </StackList>
    </LayoutNormal>
  );
};

export default ClassProgress;
