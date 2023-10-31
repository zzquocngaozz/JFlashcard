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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const currentDate = new Date(); // Ngày hiện tại
const maxDate = new Date("2023-11-05"); // Ngày kết thúc
const minDate = new Date("2023-10-30"); // Ngày bắt đầu

const options = {
  indexAxis: "y",
  scales: {
    x: {
      beginAtZero: true, // Bắt đầu trục y từ 0
      position: "bottom",
      type: "linear",
      max: 100, // Đặt giá trị tối đa trên trục y
      title: {
        display: true,
        text: "Tiến độ",
      },
    },
    // x1: {
    //   //beginAtZero: true, // Bắt đầu trục y từ 0
    //   position: "top",
    //   type: "time",
    //   min: minDate.getTime(),
    //   max: maxDate.getTime(),
    //   title: {
    //     display: true,
    //     text: "Custom X-Axis",
    //   },
    //   offset: true,
    //   time: {
    //     unit: "day",
    //     displayFormats: {
    //       day: "DD MMM",
    //     },
    //   },
    // },
    // grid line settings
    // grid: {
    //   drawOnChartArea: false, // only want the grid lines for one axis to show up
    // },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
  onClick: (e, activeEls) => {
    let datasetIndex = activeEls[0].datasetIndex;
    let dataIndex = activeEls[0].index;
    let datasetLabel = e.chart.data.datasets[datasetIndex].label;
    let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
    let label = e.chart.data.labels[dataIndex];
    console.log("In click", datasetLabel, label, value);
  },
};

const labels = [
  `Hieuht31`,
  "Ducpa02",
  "Luong03",
  "VuBQ04",
  "Hieuht03",
  "Hieuht03",
  "Hieuht03",
];

const data = {
  labels,
  datasets: [
    {
      label: "Tiến độ",
      data: [10, 20, 15, 30, 25, 14, 15],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      barPercentage: 0.2, // Điều chỉnh chiều rộng của các thanh
      xAxisID: "x",
    },
    // {
    //   label: "Dataset 2",
    //   data: [10, 20, 15, 30, 25, 14, 15],
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    //   xAxisID: "x1",
    // },
  ],
};

const ClassProgress = () => {
  const { setId } = useParams();
  const chartRef = useRef();
  const [activeBar, setActiveBar] = useState(null);
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
  };
  return (
    <LayoutNormal>
      Hello world {setId}
      <StackList height={"500px"}>
        <Bar data={data} options={options} />
        <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
          <Button onClick={onClick}>click</Button>
          <Button onClick={onClick}>click</Button>
          <Button onClick={onClick}>click</Button>
          <Button onClick={onClick}>click</Button>
          <Button onClick={onClick}>click</Button>
          <Button onClick={onClick}>click</Button>
        </Stack>
      </StackList>
    </LayoutNormal>
  );
};

export default ClassProgress;
