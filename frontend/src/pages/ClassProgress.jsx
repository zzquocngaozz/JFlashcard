import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import HorizontalBarChart from "../components/DataDisplay/HorizontalBarChart";
import { StackList } from "../components/Styled/StyledStack";
import OverallLearnProgress from "../components/DataDisplay/OverallLearnProgress";
import { isEmpty } from "../utils/manualTesting";
import { getExpectLearn, getStatus } from "../utils/parseData";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import useLearnTracking from "../hooks/useLearnTracking";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import DialogAlertSendMail from "../components/Dialog/DialogAlertSendMail";

const ClassProgress = () => {
  const { classSetId } = useParams();
  const { loading, mutationing, learnProgress, sendEmail } = useLearnTracking();
  // const [learnProgress, setLearnProgress] = useState({});
  const [pasreListProgress, setPasreListProgress] = useState(null);
  const [filterBy, setFilterBy] = useState(-1);
  const [filterProgress, setFilterProgress] = useState({});
  const [alertEmailSend, setAlertEmailSend] = useState({
    open: false,
    message: "",
  });
  const [prepareEmail, setPrepareEmail] = useState({});
  const navigate = useNavigate();

  const handleChangeFilter = (filter) => {
    if (filter === filterBy) {
      setFilterBy(-1);
      return;
    }
    setFilterBy(filter);
  };
  const handleToggle = () => {
    setAlertEmailSend({
      ...alertEmailSend,
      open: !alertEmailSend.open,
    });
  };
  const onSendMail = (sendTo, message) => {
    sendEmail(sendTo, handleToggle);
  };

  const onClickSendEmail = () => {
    if (filterBy === -1) {
      setAlertEmailSend({
        message: "Bạn có chắc muốn gửi mail đến toàn bộ học sinh",
        open: true,
        sendTo: {
          onTracking: pasreListProgress?.goodJob,
          behind: pasreListProgress?.warn,
          lazy: pasreListProgress?.redFlag,
        },
      });
      return;
    }

    if (filterBy === 0) {
      setAlertEmailSend({
        message: "Bạn có chắc muốn gửi mail đến những học sinh cần cảnh báo",
        open: true,
        sendTo: {
          onTracking: [],
          behind: [],
          lazy: pasreListProgress?.redFlag,
        },
      });
      return;
    }
    if (filterBy === 1) {
      setAlertEmailSend({
        message: "Bạn có chắc muốn gửi mail đến những học sinh cần lưu ý",
        open: true,
        sendTo: {
          onTracking: [],
          behind: pasreListProgress?.warn,
          lazy: [],
        },
      });
      return;
    }
    if (filterBy === 2) {
      setAlertEmailSend({
        message: "Bạn có chắc muốn gửi mail khích lệ những học sinh làm tốt",
        open: true,
        sendTo: {
          onTracking: pasreListProgress?.goodJob,
          behind: [],
          lazy: [],
        },
      });
      return;
    }
  };

  useEffect(() => {
    if (isEmpty(learnProgress)) return;
    setFilterProgress({ ...learnProgress });
    const pasredProgress = learnProgress?.data?.reduce(
      (result, progressLearn) => {
        const status = getStatus(
          getExpectLearn(learnProgress?.startDate, learnProgress?.dueDate),
          (progressLearn?.numberLearned * 100) / learnProgress?.numberCards
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

    setPasreListProgress({ ...pasredProgress });
  }, [learnProgress]);

  useEffect(() => {
    if (filterBy === -1) setFilterProgress({ ...learnProgress });
    if (filterBy === 0)
      setFilterProgress({
        ...learnProgress,
        data: [...pasreListProgress?.redFlag],
      });
    if (filterBy === 1)
      setFilterProgress({
        ...learnProgress,
        data: [...pasreListProgress?.warn],
      });
    if (filterBy === 2)
      setFilterProgress({
        ...learnProgress,
        data: [...pasreListProgress?.goodJob],
      });
  }, [filterBy]);

  return (
    <LayoutNormal>
      <StackList
        sx={{
          flexDirection: "row",
          marginTop: "30px",
          alignItems: "flex-start",
        }}
      >
        <Box
          width={"28%"}
          height={"100%"}
          margin={"0 auto"}
          className={"container__theme"}
        >
          {!Boolean(pasreListProgress) || loading ? (
            <Stack
              spacing={1}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                width={200}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={100}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width={285}
                height={285}
              />
            </Stack>
          ) : (
            <OverallLearnProgress
              labelData={[
                pasreListProgress?.redFlag?.length,
                pasreListProgress?.warn?.length,
                pasreListProgress?.goodJob?.length,
              ]}
              handleChangeFilter={handleChangeFilter}
            />
          )}
          <StackList mt={2} justifyContent={"center"}>
            <Stack flexDirection={"row"}>
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={100}
                  height={30}
                />
              ) : (
                <>
                  <FilterAltOutlinedIcon />
                  <Typography>Lọc theo:</Typography>
                </>
              )}
            </Stack>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width={200}
                height={30}
              />
            ) : filterBy === -1 ? (
              <Chip label="Tất cả" variant="outlined" />
            ) : filterBy === 0 ? (
              <Chip
                label="Cần nhắc nhở"
                variant="outlined"
                color="error"
                onDelete={() => {
                  handleChangeFilter(-1);
                }}
              />
            ) : filterBy === 1 ? (
              <Chip
                label="Cần lưu ý"
                variant="outlined"
                color="warning"
                onDelete={() => {
                  handleChangeFilter(-1);
                }}
              />
            ) : filterBy === 2 ? (
              <Chip
                label="Làm tốt"
                variant="outlined"
                color="success"
                onDelete={() => {
                  handleChangeFilter(-1);
                }}
              />
            ) : (
              <></>
            )}
          </StackList>
          <StackList justifyContent={"center"} sx={{ margin: "13px auto" }}>
            {loading ? (
              <>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={120}
                  height={38}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={120}
                  height={38}
                />
              </>
            ) : (
              <>
                <Button
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                  color="secondary"
                  variant="contained"
                  startIcon={<ArrowBackOutlinedIcon />}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở lại
                </Button>
                <Button
                  className="text--cap"
                  sx={{ textTransform: "none", borderRadius: "8px" }}
                  variant="contained"
                  startIcon={<MailOutlinedIcon />}
                  onClick={onClickSendEmail}
                >
                  Gửi mail
                </Button>
              </>
            )}
          </StackList>
        </Box>
        <Box width={"65%"} margin={"0 auto"} className={"container__theme"}>
          <HorizontalBarChart
            learnProgress={filterProgress}
            key={filterProgress}
            setAlertEmailSend={setAlertEmailSend}
          />
        </Box>
      </StackList>
      {alertEmailSend.open ? (
        <DialogAlertSendMail
          mutationing={mutationing}
          alertEmailSend={alertEmailSend}
          handleToggle={handleToggle}
          onSendMail={onSendMail}
        />
      ) : (
        <></>
      )}
    </LayoutNormal>
  );
};

export default ClassProgress;
