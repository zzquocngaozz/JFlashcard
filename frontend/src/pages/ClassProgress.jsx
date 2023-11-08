import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Box } from "@mui/material";
import HorizontalBarChart from "../components/DataDisplay/HorizontalBarChart";
import { StackList } from "../components/Styled/StyledStack";
import OverallLearnProgress from "../components/DataDisplay/OverallLearnProgress";
import { isEmpty } from "../utils/manualTesting";
import { getExpectLearn, getStatus } from "../utils/parseData";

const ClassProgress = () => {
  const { setId } = useParams();
  const [learnProgress, setLearnProgress] = useState({});
  const [pasreListProgress, setPasreListProgress] = useState([]);
  const [filterBy, setFilterBy] = useState(-1);

  const handleChangeFilter = (filter) => {
    if (filter === filterBy) {
      setFilterBy(-1);
      return;
    }
    setFilterBy(filter);
  };
  useEffect(() => {
    setTimeout(() => {
      setLearnProgress({
        flashcardSetId: 1,
        title: "Kanji bộ thuỷ",
        startDate: new Date("2023-10-31"), // ngày bộ thẻ đuoc gan vao lop học
        dueDate: new Date("2023-11-07"),
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
            userId: 3,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 4,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 5,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 6,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 7,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 8,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 9,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 10,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 11,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 12,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 13,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 14,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 15,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 16,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 17,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 18,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 19,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 20,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 21,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 22,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
          {
            userId: 23,
            userName: "hieuht01",
            email: "hieuht01@gmail.com",
            numberLearned: 20,
          },
          {
            userId: 24,
            userName: "huudd01",
            email: "huudd01@gmail.com",
            numberLearned: 30,
          },
        ],
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isEmpty(learnProgress)) return;

    const pasreListProgress = learnProgress?.data?.reduce(
      (result, progressLearn) => {
        const status = getStatus(
          getExpectLearn(
            learnProgress?.startDate,
            learnProgress?.dueDate,
            learnProgress?.numberCards
          ),
          progressLearn?.numberLearned
        );
        if (status === 0) result.redFlag.push(progressLearn);
        if (status === 1) result.warn.push(progressLearn);
        if (status === 2) result.goodJob.push(progressLearn);
        return result;
      },
      {
        redFlag: [],
        warn: [],
        goodJob: [],
      }
    );
  }, [learnProgress]);

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
