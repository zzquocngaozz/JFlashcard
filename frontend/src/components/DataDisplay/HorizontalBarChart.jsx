import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Box,
  Button,
  Pagination,
  Skeleton,
  Stack,
  styled,
} from "@mui/material";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import emailSVG from "../../assets/icons/emailSVG.svg";
import BackdropLoading from "../FeedBack/BackdropLoading";
import { StackList } from "../Styled/StyledStack";
import { isEmpty } from "../../utils/manualTesting";
import {
  customFormatDate,
  getAnnotationLine,
  getBarColor,
  getData,
  getExpectLearn,
  getOptionChart,
  getProgess,
  getStatus,
  splitTimeRange,
} from "../../utils/parseData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels
);

export function getImage() {
  const img = new Image();
  img.src = emailSVG;
  return img;
}

class CustomEmailAnnotation {
  constructor(yValue, onClick) {
    this.type = "label";
    this.drawTime = "afterDraw";
    this.content = getImage();
    this.width = 20;
    this.height = 15;
    this.xValue = 100;
    this.yValue = yValue;
    this.xAdjust = 20;
    this.click = onClick;
  }
}

const HorizontalBarChart = ({ learnProgress }) => {
  const [chartTitle, setChartTitle] = useState("");
  const [timeProgressLabels, setTimeProgressLabels] = useState([]);
  const [lineAnnotate, setLineAnnotate] = useState({
    progressLineAnnotate: {},
    warnLineAnnotate: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [chartProps, setChartProps] = useState({
    data: {},
    options: {},
  });

  useEffect(() => {
    if (isEmpty(learnProgress)) return;
    setLoading(true);
    setChartTitle(learnProgress?.title);
    setTimeProgressLabels(
      splitTimeRange(learnProgress?.startDate, learnProgress?.dueDate)
    );
    const expect = getExpectLearn(
      learnProgress?.startDate,
      learnProgress?.dueDate,
      learnProgress?.numberCards
    );
    setLineAnnotate({
      progressLineAnnotate: getAnnotationLine(
        expect,
        customFormatDate(new Date()),
        0
      ),
      warnLineAnnotate: getAnnotationLine(expect / 2, "", 1),
    });
    // Box
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [learnProgress]);

  useEffect(() => {
    if (chartTitle === "") return;
    const NUMBER_RECORD = 10;
    const startRecord = (currentPage - 1) * NUMBER_RECORD;
    const endRecord = (currentPage - 1) * NUMBER_RECORD + 10;
    const pagin = learnProgress?.data?.slice(startRecord, endRecord);

    if (pagin?.length > 0) {
      const parsedData = pagin.reduce(
        (result, student, index) => {
          const firstLetter = student?.userName[0];

          result.labels.push(
            student?.userName.replace(firstLetter, firstLetter.toUpperCase())
          );
          result.datas.push(
            // chartData.getProgess.call(student, learnProgress?.numberCards)
            getProgess(student?.numberLearned, learnProgress.numberCards)
          );
          result.backgroundColors.push(
            getBarColor(
              getStatus(
                getExpectLearn(
                  learnProgress?.startDate,
                  learnProgress?.dueDate,
                  learnProgress?.numberCards
                ),
                (student?.numberLearned * 100) / learnProgress?.numberCards
              )
            )
          );

          const onClick = () => {
            handleClickEmail(student);
          };

          const reponseIndex = NUMBER_RECORD - pagin.length + index;
          result.emailAnnotation.push(
            new CustomEmailAnnotation(reponseIndex, onClick)
          );
          return result;
        },
        { datas: [], backgroundColors: [], labels: [], emailAnnotation: [] }
      );
      for (let i = parsedData.datas.length; i < 10; i++) {
        parsedData.datas.unshift(0);
        parsedData.labels.unshift("");
        parsedData.backgroundColors.unshift("#fff");
      }

      const dataSets = {
        data: parsedData?.datas,
        backgroundColor: parsedData?.backgroundColors,
      };
      const annotations = [
        lineAnnotate.progressLineAnnotate,
        lineAnnotate.warnLineAnnotate,
        ...parsedData?.emailAnnotation,
      ];
      setChartProps({
        data: { ...getData(parsedData?.labels, dataSets) },
        options: {
          ...getOptionChart(chartTitle, timeProgressLabels, annotations),
        },
      });
    }
    // setLoading(false);
  }, [currentPage, learnProgress, lineAnnotate]);

  const handleClickEmail = (student) => {
    console.log(student);
  };

  const handlePaging = (e, newValue) => {
    setCurrentPage(newValue);
  };

  return (
    <>
      {loading ? (
        <Box>
          <CustomSkelecton sx={{ height: "30px" }} />
          <CustomSkelecton sx={{ height: "420px" }} />
          <CustomSkelecton
            sx={{ height: "30px", width: "100px", float: "right" }}
          />
        </Box>
      ) : (
        <Stack>
          <Bar data={chartProps?.data} options={chartProps?.options} />
          <StackList justifyContent={"space-between"}>
            Hello world
            <Pagination
              count={Math.ceil(learnProgress?.data?.length / 10)}
              color="primary"
              onChange={handlePaging}
            />
          </StackList>
        </Stack>
      )}
    </>
  );
};

const CustomSkelecton = styled(Skeleton)({
  "-webkit-transform": "scale(1, 0.90)",
  "-moz-transform": "scale(1, 0.90)",
  "-ms-transform": "scale(1, 0.90)",
  transform: "scale(1, 0.90)",
});

export default React.memo(HorizontalBarChart);
