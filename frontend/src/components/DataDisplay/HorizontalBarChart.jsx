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

function customFormatDate(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${hours}h ${day}/${month}`;
}

function splitTimeRange(startDate, endDate) {
  const dateArray = [];
  const totalHours = (endDate - startDate) / (1000 * 60 * 60); // Tổng số giờ giữa startDate và endDate
  // Số khoảng thời gian bạn muốn tạo (5 trong ví dụ này)
  const numberOfRanges = 4;
  // Tính toán số giờ cho mỗi khoảng thời gian
  const interval = totalHours / numberOfRanges;

  for (let i = 0; i < numberOfRanges; i++) {
    const newDate = new Date(
      startDate.getTime() + i * interval * 60 * 60 * 1000
    );

    dateArray.push(newDate);
  }
  dateArray.push(endDate);

  return dateArray.map((date) => {
    if (interval % 24 !== 0) return customFormatDate(date);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  });
}

export function getImage() {
  const img = new Image();
  img.src = emailSVG;
  return img;
}

/**
 *
 *@param type 1 is red flag, another is expect
 */
const getAnnotationLine = (value, currentDate = "", type) => ({
  type: "line",
  scaleID: "x",
  borderDash: [6, 6],
  value: value,
  borderColor: type === 1 ? "#FF5B22" : "#4F6F52",
  borderWidth: 2,
  // TODO: chuyen thanh variable
  label: {
    content: [
      type === 1 ? "Red flag" : "Tiến độ dự kiến",
      currentDate,
      value + " %",
    ],
    display: false,
    position: type === 1 ? "end" : "start",
    borderWidth: 1,
  },
  enter({ chart, element }, event) {
    element.label.options.display = true;
    chart.canvas.style.cursor = "pointer";
    return true;
  },
  leave({ chart, element }, event) {
    element.label.options.display = false;
    chart.canvas.style.cursor = "default";
    return true;
  },
});

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

const getOptionChart = (title, timeProgressLabels, annotations) => ({
  indexAxis: "y",
  layout: {
    padding: {
      right: 40,
    },
  },
  scales: {
    x: {
      beginAtZero: true, // Bắt đầu trục x từ 0
      position: "bottom",
      type: "linear",
      max: 100, // Đặt giá trị tối đa cho trục x
      ticks: {
        reverse: false,
        stepSize: 25,
        callback(value) {
          return `${value} %`;
        },
      },
      title: {
        display: true,
        text: "Tiến độ",
      },
    },
    x1: {
      position: "top",
      type: "category",
      labels: timeProgressLabels,
      title: {
        display: true,
        text: "Thời gian làm",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
    },
    title: {
      display: true,
      text: title,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          let data = context.dataset.data || "";
          if (label) {
            label += ": ";
          }
          if (data) {
            label += data[context.dataIndex] + "%";
          }
          return label;
        },
      },
    },
    annotation: {
      enter: function enter({ chart, element }) {
        chart.canvas.style.cursor = "pointer";
      },

      leave: function leave({ chart, element }) {
        chart.canvas.style.cursor = "default";
      },
      clip: false,
      annotations: annotations,
    },
    datalabels: {
      formatter: function (value) {
        console.log(value);
        return value + " %";
      },
      anchor: "end",
      color: "rgba(255,255,255 ,0.8)",
      align: -2,
      offset: -40,
    },
  },
});

const getData = (labels, dataSets) => {
  return {
    labels,
    datasets: [
      {
        label: "Tiến độ",
        barPercentage: 0.6,
        xAxisID: "x",
        ...dataSets,
      },
    ],
  };
};

const getBarColor = function (statusFlag = 0 | 1 | 2) {
  return {
    0: "#950101", // redflag
    1: "#F4CE14", // warn
    2: "#1A5D1A", // good job
  }[statusFlag];
};
const learnProgress = {
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
      userName: "hieuht02",
      email: "hieuht02@gmail.com",
      numberLearned: 10,
    },
    {
      userId: 3,
      userName: "huudd02",
      email: "huudd02@gmail.com",
      numberLearned: 18,
    },
    {
      userId: 4,
      userName: "hieuht04",
      email: "hieuht04@gmail.com",
      numberLearned: 24,
    },
    {
      userId: 5,
      userName: "huudd05",
      email: "huudd05@gmail.com",
      numberLearned: 25,
    },
    {
      userId: 6,
      userName: "hieuht06",
      email: "hieuht06@gmail.com",
      numberLearned: 22,
    },
    {
      userId: 7,
      userName: "huudd07",
      email: "huudd07@gmail.com",
      numberLearned: 24,
    },
    {
      userId: 8,
      userName: "hieuht08",
      email: "hieuht08@gmail.com",
      numberLearned: 18,
    },
    {
      userId: 9,
      userName: "huudd09",
      email: "huudd09@gmail.com",
      numberLearned: 45,
    },
    {
      userId: 10,
      userName: "hieuht10",
      email: "hieuht12@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd11",
      email: "huudd11@gmail.com",
      numberLearned: 60,
    },
  ],
};

/**
 * Hold prototype handle to get status of card
 */
const chartData = {
  userId: 2,
  userName: "huudd01",
  email: "huudd01@gmail.com",
  numberLearned: 30,
  getProgess: function (numberCards) {
    return Math.round((this.numberLearned / numberCards) * 100, 2);
  },
  /**
   * expect = Math.floor((current - start)*numberCard/(due-start))
   */
  getStatus: function (expect, numberCards) {
    if (numberCards < expect / 2) return 0; // redflag
    if (numberCards >= expect) return 2; // goodjob
    return 1; // warn
  },
};

const getExpectLearn = (start, due, learnCard) => {
  const current = new Date().getTime();
  const startTime = new Date(start).getTime();
  const dueTime = new Date(due).getTime();

  return dueTime < current
    ? 100
    : Math.round(
        ((current - startTime) / (dueTime - startTime)) * learnCard,
        2
      );
};

const HorizontalBarChart = ({ learnProgress: passedData }) => {
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
  }, []);

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
            chartData.getProgess.call(student, learnProgress?.numberCards)
          );
          result.backgroundColors.push(
            getBarColor(
              chartData.getStatus.apply(student, [
                getExpectLearn(
                  learnProgress?.startDate,
                  learnProgress?.dueDate,
                  learnProgress?.numberCards
                ),
                (student?.numberLearned * 100) / learnProgress?.numberCards,
              ])
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
