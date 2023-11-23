import React, { useEffect, useState } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import { FLAG_STATUS, SET_TYPE } from "../utils/constant";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

import ShowMoreText from "../components/DataDisplay/ShowMoreText";

import BlockIcon from "@mui/icons-material/Block";
import { useInitSetEditContext } from "../context/SetEditContext";
import CardEditContainer from "../components/CardEditContainer";
import { StackList } from "../components/Styled/StyledStack";
import useAuth from "../hooks/useAuth";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import LayoutManager from "../components/Parts/LayoutManager";

const SetCheck = () => {
  // ------------------ Handle delete alert show and hide

  const handleTogglePublic = () => {
    setAlertPublic({
      ...alertPublic,
      open: !alertPublic.open,
    });
  };
  const handleToggleReject = () => {
    setAlertReject({
      ...alertReject,
      open: !alertReject.open,
    });
  };

  const [alertPublic, setAlertPublic] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Hãy kiểm tra thật cẩn trọng. Bạn có muốn công khai  phần này?",
  });
  const [alertReject, setAlertReject] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message:
      "Hãy kiểm tra thật cẩn trọng. Bạn có muốn chặn public học phần này?",
  });

  const {
    dataSet: flashcardSet,
    loading,
    importing,
    mutationing,
    publicSet,
    rejectSet,
  } = useInitSetEditContext();

  useEffect(() => {
    document.title = "Kiểm duyệt học phần";
  }, []);
  return (
    <LayoutManager>
      {loading ? (
        <BackdropLoading />
      ) : (
        <>
          <Stack
            component={Paper}
            sx={{
              flexDirection: "row",
              margin: "20px 50px",
              p: "30px 20px",
              borderRadius: "8px",
            }}
          >
            <Stack flex={3} sx={{ gap: 2 }}>
              <Typography variant="h5">{flashcardSet?.title}</Typography>
              <ShowMoreText maxLength={100}>
                {flashcardSet?.description}
              </ShowMoreText>
              <Stack sx={{ flexDirection: "row", gap: 1, width: 200 }}>
                <Chip
                  label={SET_TYPE[flashcardSet?.type]}
                  color="info"
                  variant="contained"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={`${FLAG_STATUS[flashcardSet?.status]}`}
                  variant="contained"
                />
              </Stack>
            </Stack>
            <StackList
              flex={1.5}
              sx={{ alignItems: "flex-start", justifyContent: "flex-end" }}
            >
              <Button
                startIcon={<DoneIcon />}
                sx={{ textTransform: "none" }}
                variant="contained"
                color="success"
                onClick={handleTogglePublic}
              >
                Công khai
              </Button>
              <Button
                startIcon={<BlockIcon />}
                color="error"
                sx={{ textTransform: "none" }}
                variant="contained"
                onClick={handleToggleReject}
              >
                Chặn
              </Button>
            </StackList>
          </Stack>
          <Stack sx={{ margin: "20px 50px" }}>
            <CardEditContainer importing={importing} />
          </Stack>
        </>
      )}
      {alertPublic.open ? (
        <DialogAlertDelete
          alertDelete={alertPublic}
          handleToggleAlertDelete={handleTogglePublic}
          onDelete={() => publicSet(handleTogglePublic)}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertReject.open ? (
        <DialogAlertDelete
          alertDelete={alertReject}
          handleToggleAlertDelete={handleToggleReject}
          onDelete={() => rejectSet(handleToggleReject)}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
    </LayoutManager>
  );
};

export default SetCheck;
