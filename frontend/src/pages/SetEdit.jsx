import React, { useEffect, useState } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneIcon from "@mui/icons-material/Done";
import { FLAG_STATUS, SET_TYPE } from "../utils/constant";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import FormEditSetDiaolog from "../components/Dialog/FormEditSetDiaolog";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useSetEdit from "../hooks/useSetEdit";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import ShowMoreText from "../components/DataDisplay/ShowMoreText";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import ImportFileDialog from "../components/Dialog/ImportFileDialog";
import { useInitSetEditContext } from "../context/SetEditContext";
import CardEditContainer from "../components/CardEditContainer";
import { StackList } from "../components/Styled/StyledStack";
import useAuth from "../hooks/useAuth";

const SetEdit = () => {
  const { setId } = useParams();
  // ------------------ Handle delete alert show and hide
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleToggleAlertDelete = () => {
    setAlertDelete({
      ...alertDelete,
      open: !alertDelete.open,
    });
  };
  const handleToggleAlertVisible = () => {
    setAlertVisible({
      ...alertVisible,
      open: !alertVisible.open,
    });
  };
  const handleToggleWaiting = () => {
    setAlerttWaiting({
      ...alertWaiting,
      open: !alertWaiting.open,
    });
  };
  const handleToggleRequestUpdate = () => {
    setAlertRequestUpdate({
      ...alertRequestUpdate,
      open: !alertRequestUpdate.open,
    });
  };
  // alert mard done
  const handleToggleMarkDone = () => {
    setAlertUpdating({
      ...alertUpdating,
      open: !alertUpdating.open,
    });
  };

  const handleToggleUpdateSet = () => {
    setOpenEditFrom(!openEditForm);
  };
  const [openEditForm, setOpenEditFrom] = useState(false);
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Bạn muốn đóng học phần này ?",
  });
  const [alertVisible, setAlertVisible] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Bạn muốn công khai học phần này ?",
  });
  const [alertUpdating, setAlertUpdating] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Bạn muốn đánh dấu hoàn thành học phần này?",
  });
  const [alertRequestUpdate, setAlertRequestUpdate] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Bạn muốn cập nhật lại học phần này?",
  });
  const [alertWaiting, setAlerttWaiting] = useState({
    open: false,
    loadingMessage: "Đang cập nhật trạng thái",
    message: "Bạn muốn yêu cầu duyệt để công bố học phần này?",
  });

  // const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  // const {
  //   dataSet: flashcardSet,
  //   mutationing,
  //   importing,
  //   importFile,
  //   loading,
  //   updateSet,
  //   deleteSet,
  // } = useSetEdit({ handleToggleUpdateSet, setAlert });

  const {
    dataSet: flashcardSet,
    loading,
    mutationing,
    importing,
    alert,
    handleCloseSnackBar,
    deleteSet,
    updateSet,
  } = useInitSetEditContext();

  const handleUpdateSet = (data) => {
    updateSet(data, handleToggleUpdateSet);
  };
  const handleSetMarkDone = () => {
    updateSet({ ...flashcardSet, status: 2 }, handleToggleMarkDone);
  };
  const handleSetWaiting = () => {
    updateSet({ ...flashcardSet, status: 5 }, handleToggleWaiting);
  };
  const handleSetRequestUpdate = () => {
    updateSet({ ...flashcardSet, status: 7 }, handleToggleRequestUpdate);
  };
  const handleSetVisible = () => {
    updateSet({ ...flashcardSet, status: 3 }, handleToggleAlertVisible);
  };
  useEffect(() => {
    if (currentUser.role === 4) navigate(`/${setId}/check`);
    document.title = "Chỉnh sửa bộ flashcards";
  }, []);
  return (
    <LayoutNormal>
      {loading ? (
        <BackdropLoading />
      ) : (
        <>
          <Stack
            component={Paper}
            sx={{
              flexDirection: "row",
              margin: "20px 150px",
              p: "10px 20px",
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
                {/* {flashcardSet?.private ? (
                  <Chip
                    label={"Riêng tư"}
                    color="default"
                    variant="contained"
                  />
                ) : (
                  <Chip
                    label={"Công khai"}
                    color="secondary"
                    variant="contained"
                  />
                )} */}
                <Chip
                  label={`${FLAG_STATUS[flashcardSet?.status]}`}
                  variant="contained"
                />
              </Stack>
            </Stack>
            <Stack flex={1.5} sx={{ justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  mr: "10px",
                  justifyContent: "flex-end",
                }}
              >
                {flashcardSet.status !== 1 &&
                flashcardSet.status !== 7 &&
                currentUser.role === 2 ? (
                  <Tooltip title={"Chỉnh sửa học phần"}>
                    <IconButton onClick={handleToggleRequestUpdate}>
                      <ModeEditIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title={"Chỉnh sửa"}>
                    <IconButton onClick={handleToggleUpdateSet}>
                      <ModeEditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                )}
                {(flashcardSet.status < 3 ||
                  flashcardSet.status === 6 ||
                  flashcardSet.status === 7 ||
                  flashcardSet.status === 8) &&
                currentUser.role === 2 ? (
                  <Tooltip title={"Yêu cầu duyệt"}>
                    <Box>
                      <IconButton onClick={handleToggleWaiting}>
                        <VerifiedIcon color="success" />
                      </IconButton>
                    </Box>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {flashcardSet?.status === 3 ? (
                  <Tooltip title={"Đóng"}>
                    <IconButton onClick={handleToggleAlertDelete}>
                      <PublicOffIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : flashcardSet?.status === 4 ? (
                  <Tooltip title={"Công khai"}>
                    <IconButton onClick={handleToggleAlertVisible}>
                      <PublicIcon color="success" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {flashcardSet?.status < 3 && currentUser.role === 1 ? (
                  <Tooltip title={"Công khai"}>
                    <IconButton onClick={handleToggleAlertVisible}>
                      <PublicIcon color="success" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Box>
              <Stack
                flexDirection={"row"}
                sx={{ gap: 2, justifyContent: "flex-end" }}
              >
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  }}
                  variant="contained"
                  LinkComponent={Link}
                  to={`/my-lib/set-manager`}
                >
                  Về thư viện
                </Button>
                {flashcardSet.status === 1 || flashcardSet.status === 7 ? (
                  <Button
                    startIcon={<DoneIcon />}
                    sx={{
                      textTransform: "none",
                    }}
                    variant="contained"
                    onClick={handleToggleMarkDone}
                  >
                    Hoàn thành
                  </Button>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ margin: "20px 150px" }}>
            {flashcardSet.type === 1 ? (
              <CardEditContainer importing={importing} />
            ) : flashcardSet.type === 2 ? (
              <CardEditContainer importing={importing} />
            ) : flashcardSet.type === 3 ? (
              <CardEditContainer importing={importing} />
            ) : (
              <></>
            )}
          </Stack>
        </>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleAlertDelete}
          onDelete={() => deleteSet(handleToggleAlertDelete)}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertVisible.open ? (
        <DialogAlertDelete
          alertDelete={alertVisible}
          handleToggleAlertDelete={handleToggleAlertVisible}
          onDelete={handleSetVisible}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertUpdating.open ? (
        <DialogAlertDelete
          alertDelete={alertUpdating}
          handleToggleAlertDelete={handleToggleMarkDone}
          onDelete={handleSetMarkDone}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertWaiting.open ? (
        <DialogAlertDelete
          alertDelete={alertWaiting}
          handleToggleAlertDelete={handleToggleWaiting}
          onDelete={handleSetWaiting}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertRequestUpdate.open ? (
        <DialogAlertDelete
          alertDelete={alertRequestUpdate}
          handleToggleAlertDelete={handleToggleRequestUpdate}
          onDelete={handleSetRequestUpdate}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openEditForm ? (
        <FormEditSetDiaolog
          flashcardSet={flashcardSet}
          handleToggleUpdateSet={handleToggleUpdateSet}
          updateSet={handleUpdateSet}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {mutationing ? <BackdropLoading></BackdropLoading> : <></>}
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        <></>
      )}
    </LayoutNormal>
  );
};

export default SetEdit;
