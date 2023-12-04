import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classHonor from "../assets/images/classHonor.png";
import userHonor from "../assets/images/userHonor.png";
import LayoutAdmin from "../components/Parts/LayoutAdmin";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import AdminDashboardHeader from "../components/DataDisplay/AdminDashboardHeader";
import TopClass from "../components/TopClass";
import { StackList } from "../components/Styled/StyledStack";
import TopUser from "../components/TopUser";
import TopLearnSetCard from "../components/Cards/TopLearnSetCard";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { getWeekDate } from "../utils/datetimeCalc";
import AdminSetLearnChart from "../components/DataDisplay/AdminSetLearnChart";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [dataTop, setDataTop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { accessToken } = useAuth();

  useEffect(() => {
    document.title = "JFlashcard";
    const fetchData = async () => {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      try {
        const fetchData = axios.get("/dashboard", config);
        const fetchChart = axios.post(
          "/dashboard",
          JSON.stringify(getWeekDate(0)),
          config
        );
        const fetchDataTop = axios.get("", config);

        const response = await fetchData;
        const responseChart = await fetchChart;
        const responseTop = await fetchDataTop;
        setData(response.data);
        setDataChart(responseChart.data);
        setDataTop(responseTop.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getWeekTracking = async (weekIndex) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    try {
      const fetchChart = axios.post(
        "/dashboard",
        JSON.stringify(getWeekDate(weekIndex)),
        config
      );
      const responseChart = await fetchChart;
      setDataChart(responseChart.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LayoutAdmin>
      {loading ? (
        <BackdropLoading />
      ) : (
        <>
          <AdminDashboardHeader data={data} />
          <AdminSetLearnChart
            data={dataChart}
            dataDoughnut={data?.numberFLCard}
            getWeekTracking={getWeekTracking}
          />
          <StackList sx={{ justifyContent: "space-between" }}>
            <Stack
              sx={{
                flexDirection: "column-reverse",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={userHonor}
                alt="create"
                style={{
                  width: "50%",
                  clipPath: "1/1",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="h5" mt={1}>
                  Người học chăm chỉ
                </Typography>
                <TopUser userTop={dataTop?.userTop} />
              </Box>
            </Stack>
            <Stack
              spacing={5}
              sx={{
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={classHonor}
                alt="create"
                style={{ width: "50%", clipPath: "1/1", objectFit: "cover" }}
              />
              <Box>
                <Typography variant="h5">Lớp học nổi bật</Typography>
                {dataTop ? <TopClass classRoom={dataTop?.classRoom} /> : <></>}
              </Box>
            </Stack>
          </StackList>
          <Stack
            sx={{
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Typography variant="h5" sx={{ marginTop: "8px" }}>
              Bộ thẻ được học nhiều nhất
            </Typography>
            <TopLearnSetCard
              setVote={dataTop?.setLearn}
              orientation={"vertical"}
            />
          </Stack>
        </>
      )}
    </LayoutAdmin>
  );
};

export default Dashboard;
