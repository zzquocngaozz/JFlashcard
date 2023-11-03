import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";
import { Box, Button, Stack } from "@mui/material";
import HorizontalBarChart from "../components/DataDisplay/HorizontalBarChart";
import { StackList } from "../components/Styled/StyledStack";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import emailSVG from "../assets/icons/emailSVG.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
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

  console.log(totalHours);
  // Số khoảng thời gian bạn muốn tạo (5 trong ví dụ này)
  const numberOfRanges = 5;

  // Tính toán số giờ cho mỗi khoảng thời gian
  const interval = totalHours / numberOfRanges;

  console.log(interval);
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

// Sử dụng hàm
const startDate = new Date("2023-10-31");
const endDate = new Date("2023-11-06");
const timeProgressLabels = splitTimeRange(startDate, endDate);
console.log(timeProgressLabels);

export function getImage() {
  const img = new Image();
  img.src = emailSVG;
  return img;
}

const progressLineAnnotate = {
  type: "line",
  scaleID: "x",
  borderDash: [6, 6],
  value: 21.5,
  borderColor: "#4F6F52",
  borderWidth: 2,
  mousemove: function () {
    console.log("mousemove");
  },
  click: function ({ chart, element }) {
    console.log("Line annotation clicked");

    console.log(element);
  },
  // TODO: chuyen thanh variable
  label: {
    content: ["Tiến độ dự kiến", "14/3", "21.5"],
    width: 20,
    height: 15,
    // content: getImage(),
    display: true,
    position: "start",
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
};

const warnLine = {
  type: "line",
  scaleID: "x",
  borderDash: [6, 6],
  value: 21.5 / 2,
  borderColor: "#FF5B22",
  borderWidth: 2,
  mousemove: function () {
    console.log("mousemove");
  },
  click: function ({ chart, element }) {
    console.log("Line annotation clicked");
    console.log(element);
  },
  // TODO: chuyen thanh variable
  label: {
    content: ["Red Flag", 21.5 / 2],
    width: 20,
    height: 15,
    // content: getImage(),
    display: true,
    position: "end",
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
};

const annotation1 = {
  type: "label",
  drawTime: "afterDraw",
  content: getImage(),
  width: 20,
  height: 15,
  xValue: 100,
  yValue: 1,
  xAdjust: 20,
};
class CustomAnnotation {
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

const emailAnnotattion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (student) =>
    new CustomAnnotation(student, () => {
      console.log(`clickOn ${student}`);
    })
);
console.log(emailAnnotattion);
const options = {
  indexAxis: "y",
  layout: {
    padding: {
      right: 40,
    },
  },
  scales: {
    x: {
      beginAtZero: true, // Bắt đầu trục y từ 0
      position: "bottom",
      type: "linear",
      max: 100, // Đặt giá trị tối đa cho trục x
      ticks: {
        reverse: false,
        stepSize: 20,
        // callback: function (value) {
        //   return value + "%"; // Định dạng lại giá trị của trục x thành %
        // },
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
      text: "Tiến độ của bộ Kanji từ vựng",
    },
    annotation: {
      enter: function enter({ chart, element }) {
        chart.canvas.style.cursor = "pointer";
      },

      leave: function leave({ chart, element }) {
        chart.canvas.style.cursor = "default";
      },
      clip: false,
      annotations: [progressLineAnnotate, warnLine, ...emailAnnotattion],
    },
  },
};

const labels = [
  `Hieuht31`,
  "Ducpa02",
  "Luong03",
  "VuBQ04",
  "Hieuht03",
  "Hieuht04",
  "Hieuht05",
  "Hieuht07",
  "Hieuht08",
  "Hieuht09",
];

const data = {
  labels,
  datasets: [
    {
      label: "Tiến độ",
      data: [10, 20, 15, 30, 25, 14, 15, 45, 30, 30],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 99, 132, 0.5)",
        "rgba(0, 99, 132, 0.5)",
        "rgba(255, 99, 0, 0.5)",
        "rgba(135, 99, 132, 0.5)",
        "rgba(0, 99, 0, 0.5)",
      ],
      barPercentage: 0.3,
      xAxisID: "x",
    },
  ],
};

const ClassProgress = () => {
  const { setId } = useParams();
  const learnProgress = {
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
  };

  console.log(
    (new Date().getTime() - new Date("2023-10-31").getTime()) /
      (new Date("2023-11-10").getTime() - new Date("2023-10-31").getTime())
  );
  console.log(learnProgress);

  const [activeBar, setActiveBar] = useState(null);

  return (
    <LayoutNormal>
      Hello world {setId}
      <StackList height={"100%"}>
        <Box width={"70%"} margin={"0 auto"} className={"container__theme"}>
          <Bar data={data} options={options} />
          <HorizontalBarChart />
        </Box>
      </StackList>
    </LayoutNormal>
  );
};

export default ClassProgress;
