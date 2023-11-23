import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { StackList } from "../Styled/StyledStack";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getWeekDateOption, numOfWeek } from "../../utils/datetimeCalc";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SchoolIcon from "@mui/icons-material/School";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { FLAG_STATUS } from "../../utils/constant";
import { countValues } from "../../utils/parseData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const labels = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];
const labelsDoughnut = ["Hán tự", "Từ vựng", "Ngữ pháp"];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Số học phần được học trong tuần",
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        reverse: false,
        stepSize: 5,
        callback(value) {
          return `${value} học phần`;
        },
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Số học phần của hệ thống",
    },
  },
};

const AdminSetLearnChart = ({
  data: dashboard,
  dataDoughnut,
  getWeekTracking,
}) => {
  const { currentUser } = useAuth();
  const [chartProps, setChartProps] = useState({
    data: {
      labels: labels,
      datasets: [
        {
          label: "Học phần",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(132, 99, 255, 0.5)",
          ],
        },
      ],
    },
    options: options,
  });
  const [doughnutProps, setDoughnutProps] = useState({
    data: {
      labels: labelsDoughnut,
      datasets: [
        {
          label: "Học phần",
          data: dataDoughnut,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(132, 99, 255, 0.5)",
            "rgba(132,200, 99, 0.5)",
          ],
        },
      ],
    },
    options: doughnutOptions,
  });
  const [weekIndex, setWeekIndex] = useState(0);

  const handleChange = (e) => {
    setWeekIndex(e.target.value);
  };
  const [selectSize, setSelectSize] = useState(
    numOfWeek(new Date("2023-09-01"), new Date())
  );
  useEffect(() => {
    getWeekTracking(weekIndex);
  }, [weekIndex]);
  useEffect(() => {
    setChartProps({
      data: {
        labels: labels,
        datasets: [
          {
            label: "Học phần",
            data: dashboard?.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(132, 99, 255, 0.5)",
            ],
          },
        ],
      },
      options: options,
    });

    if (!dashboard) return;
  }, [dashboard]);

  const selectRef = useRef(null);
  const handleClick = () => {
    selectRef.current.classList.toggle("active");
  };
  return (
    <StackList
      sx={{
        height: "330px",
        justifyContent: "space-between",
        position: "relative",
        mb: "30px",
      }}
    >
      <Bar
        className="container__theme"
        style={{ zIndex: "1" }}
        data={chartProps?.data}
        options={chartProps?.options}
      />
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          zIndex: "2",
          left: "590px",
        }}
        onClick={handleClick}
      >
        <DateRangeIcon />
      </IconButton>
      <Stack
        ref={selectRef}
        sx={{
          position: "absolute",
          top: "55px",
          left: "30%",
          zIndex: "0",
          opacity: 0,
          background: "#fff",
          justifyContent: "flex-end",
          rowGap: "25px",
          transition: "all .2s ease 0.05s",
          "&.active": {
            opacity: 1,
            zIndex: "10",
            left: "40%",
          },
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="date-select-label">Tuần</InputLabel>
          <Select
            labelId="date-select-label"
            id="date-select-label"
            value={weekIndex}
            label="Age"
            onChange={handleChange}
          >
            {new Array(selectSize + 1).fill(0).map((value, index) => (
              <MenuItem value={index} key={index}>
                {getWeekDateOption(index)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Doughnut
        className="container__theme"
        data={doughnutProps?.data}
        options={doughnutOptions}
      />
    </StackList>
  );
};

export default AdminSetLearnChart;
