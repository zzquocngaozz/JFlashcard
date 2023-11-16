import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { StackList } from "../Styled/StyledStack";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
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
import { getWeekDateOption, numOfWeek } from "../../utils/datetimeCalc";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Số thẻ mà bạn đã học được theo tuần",
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        reverse: false,
        stepSize: 5,
        callback(value) {
          return `${value} thẻ`;
        },
      },
    },
  },
};

const UserHomeChart = ({ data, getWeekTracking }) => {
  const { currentUser } = useAuth();
  const [chartProps, setChartProps] = useState({
    data: {
      labels: labels,
      datasets: [
        {
          label: "Số thẻ học",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(132, 99, 255, 0.5)",
          ],
        },
      ],
    },
    options: options,
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
            label: "Số thẻ học",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(132, 99, 255, 0.5)",
            ],
          },
        ],
      },
      options: options,
    });
  }, [data]);
  return (
    <StackList
      className="container__theme"
      sx={{
        height: "260px",
        justifyContent: "flex-start",

        mb: "30px",
      }}
    >
      <Bar data={chartProps?.data} options={chartProps?.options} />
      <Stack
        sx={{ justifyContent: "flex-end", height: "100%", rowGap: "25px" }}
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
    </StackList>
  );
};

export default UserHomeChart;
