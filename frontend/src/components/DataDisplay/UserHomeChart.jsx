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
import DateRangeIcon from "@mui/icons-material/DateRange";
import SchoolIcon from "@mui/icons-material/School";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { FLAG_STATUS } from "../../utils/constant";
import { countValues } from "../../utils/parseData";
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

const UserHomeChart = ({ data: dashboard, getWeekTracking }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    // cardType: { numberKanji: 0, numberVocab: 0, numberGrammar: 0 },
    cardType: [0, 0, 0],
    // dataCard: {
    //   numberDraft: 0,
    //   numberDone: 0,
    //   numberPublic: 0,
    //   numberClose: 0,
    // },
    dataCard: [0, 0, 0, 0],
    countClass: 0,
    countFolder: 0,
    dataSet: [0, 0, 0],
    setType: [0, 0, 0, 0],
  });
  const [chartProps, setChartProps] = useState({
    data: {
      labels: labels,
      datasets: [
        {
          label: "Số thẻ học",
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
    console.log("check re-render");
    setChartProps({
      data: {
        labels: labels,
        datasets: [
          {
            label: "Số thẻ học",
            data: dashboard?.weekTrackingDTOResponse?.data,
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
    const {
      cardType,
      dataCard,
      countClass,
      dataSet,
      setType,
      weekTrackingDTOResponse,
    } = dashboard;
    setUserData({
      cardType: Object.values(cardType),
      dataCard: Object.values(dataCard),
      countClass: countClass,
      countFolder: dashboard?.countFolder,
      dataSet: Object.values(dataSet),
      setType: Object.values(setType),
    });
  }, [dashboard]);

  const selectRef = useRef(null);
  const handleClick = () => {
    selectRef.current.classList.toggle("active");
  };
  return (
    <StackList
      className="container__theme"
      sx={{
        height: "260px",
        justifyContent: "space-between",
        position: "relative",
        mb: "30px",
      }}
    >
      <Bar data={chartProps?.data} options={chartProps?.options} />
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          left: "450px",
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
          left: "20%",
          opacity: 0,
          background: "#fff",
          justifyContent: "flex-end",
          rowGap: "25px",
          transition: "all .2s ease 0.05s",
          "&.active": {
            opacity: 1,
            left: "25%",
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
      <StackList
        sx={{
          width: "calc(100% - 480px)",
          justifyContent: "center",
          flexWrap: "wrap",
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
                {countValues(...userData?.cardType)}
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
                {countValues(...userData?.setType)}
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
              backgroundColor: "#435585",
              color: "#FFF",
            }}
          >
            <StackList>
              <FolderOpenIcon />
              <Typography variant="h6" flex={1}>
                Thư mục
              </Typography>
              <Typography variant="h6">
                {!!userData?.countFolder ? userData?.countFolder : 0}
              </Typography>
            </StackList>
          </Stack>
        </StackList>
      </StackList>
    </StackList>
  );
};

export default UserHomeChart;
