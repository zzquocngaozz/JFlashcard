import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip as MuiToolTip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { StackList } from "../Styled/StyledStack";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { parseBirth } from "../../utils/datetimeCalc";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getWeekDateOption,
  getWeekDate,
  numOfWeek,
} from "../../utils/datetimeCalc";
import { Bar } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const ClassSetDialog = ({ learnProgress, student, handleTogle }) => {
  const { accessToken } = useAuth();
  const { classRoomId, classSetId } = useParams();
  const [weekIndex, setWeekIndex] = useState(0);
  const [studentProgress, setStudentProgress] = useState(null);
  const [selectSize, setSelectSize] = useState(1);
  const [chartProps, setChartProps] = useState({
    data: {
      labels: labels,
      datasets: [
        {
          label: "Số thẻ học",
          data: [40, 10, 20, 30, 20, 10, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(132, 99, 255, 0.5)",
          ],
        },
      ],
    },
    options: options,
  });
  const handleChange = (e) => {
    setWeekIndex(e.target.value);
  };
  useEffect(() => {
    if (studentProgress?.startDate === studentProgress?.endDate) {
      setSelectSize(1);
      return;
    }
    setSelectSize(
      numOfWeek(
        new Date(studentProgress?.startDate),
        new Date(studentProgress?.endDate)
      )
    );
  }, [studentProgress]);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const url = `tracking/${classRoomId}/class/set/${classSetId}/view`;
        const payload = {
          flashcardSetId: learnProgress.flashcardSetId,
          userId: student.userId,
          ...getWeekDate(weekIndex),
        };
        const response = await axios.post(url, JSON.stringify(payload), config);

        setStudentProgress(response.data);
        setChartProps({
          data: {
            labels: labels,
            datasets: [
              {
                label: "Số thẻ học",
                data: response?.data?.data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(132, 99, 255, 0.5)",
                ],
              },
            ],
          },
          options: options,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgress();
  }, [weekIndex]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const url = `tracking/${classRoomId}/class/set/${classSetId}/view`;
        const payload = {
          flashcardSetId: learnProgress.flashcardSetId,
          userId: student.userId,
          ...getWeekDate(weekIndex),
        };
        const response = await axios.post(url, JSON.stringify(payload), config);

        setStudentProgress(response.data);
        setChartProps({
          data: {
            labels: labels,
            datasets: [
              {
                label: "Số thẻ học",
                data: response.data.data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(132, 99, 255, 0.5)",
                ],
              },
            ],
          },
          options: options,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgress();
  }, [student]);

  return (
    <Dialog open={true} fullWidth maxWidth={"md"} onClose={handleTogle}>
      <DialogTitle variant="h5">
        Tiến độ học của {student?.userName}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <StackList>
          <Stack sx={{ rowGap: "20px" }}>
            <StackList>
              <FilterNoneIcon />
              <Typography sx={{ width: "250px" }} className={"text--overflow"}>
                Bộ {learnProgress?.title}
              </Typography>
            </StackList>
            <StackList>
              <NoteOutlinedIcon />
              <Typography>
                Đã học {student?.numberLearned}/{learnProgress?.numberCards} thẻ
              </Typography>
            </StackList>
            <MuiToolTip title="Lần đầu học">
              <StackList>
                <AccessTimeIcon sx={{ color: "#079" }} />
                <Typography>
                  {parseBirth(studentProgress?.startDate)}
                </Typography>
              </StackList>
            </MuiToolTip>
            <MuiToolTip title="Lần học gần nhất">
              <StackList>
                <AccessTimeIcon sx={{ color: "#079" }} />
                <Typography>{parseBirth(studentProgress?.endDate)}</Typography>
              </StackList>
            </MuiToolTip>
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
          <Box sx={{ width: "100%" }} flex={1}>
            <Bar data={chartProps?.data} options={chartProps?.options} />
          </Box>
        </StackList>
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: "5px", right: "15px" }}>
        <MuiToolTip title="Đóng">
          <IconButton
            onClick={handleTogle}
            type="button"
            color="error"
            variant="outlined"
          >
            <ZoomInMapIcon />
          </IconButton>
        </MuiToolTip>
      </DialogActions>
    </Dialog>
  );
};

export default ClassSetDialog;
