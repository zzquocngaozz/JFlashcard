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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import { FLAG_STATUS, SET_TYPE } from "../utils/constant";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import FormEditSetDiaolog from "../components/Dialog/FormEditSetDiaolog";
import KanjiCardEditContainer from "../components/KanjiCardEditContainer";
import GrammarCardEditConainer from "../components/GrammarCardEditConainer";
import VocaCardEditContainer from "../components/VocaCardEditContainer";
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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

  const handleToggleUpdateSet = () => {
    setOpenEditFrom(!openEditForm);
  };
  const [openEditForm, setOpenEditFrom] = useState(false);
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    message:
      "Thao tác này không thể hoàn lại. Bạn muốn tiếp tục xoá bộ thẻ này không",
  });
  const [openImport, setOpenImport] = useState(false);
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
    importFile,
  } = useInitSetEditContext();

  const handleToggleImport = () => {
    setOpenImport(!openImport);
  };
  const handleUpdateSet = (data) => {
    updateSet(data, handleToggleUpdateSet);
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
                <Tooltip title={"Chỉnh sửa"}>
                  <IconButton onClick={handleToggleUpdateSet}>
                    <ModeEditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Xoá bộ"}>
                  <IconButton onClick={handleToggleAlertDelete}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title={"Nhập bằng file"}>
                    <IconButton component={"label"} onClick={handleToggleImport}>
                      <CloudUploadIcon /> */}
                {/* <VisuallyHiddenInput type="file" onChange={importFile} /> */}
                {/* </IconButton>
                  </Tooltip> */}
              </Box>
              <Stack
                flexDirection={"row"}
                sx={{ gap: 2, justifyContent: "flex-end" }}
              >
                {/* <Button
                    startIcon={<ArrowBackIosIcon />}
                    sx={{
                      textTransform: "none",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                    }}
                    variant="contained"
                  >
                    Trở lại
                  </Button> */}
                <Button
                  startIcon={<DoneIcon />}
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  LinkComponent={Link}
                  to={`/my-lib/set-manager`}
                >
                  Xong
                </Button>
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
          onDelete={deleteSet}
        />
      ) : (
        <></>
      )}
      {openEditForm ? (
        <FormEditSetDiaolog
          flashcardSet={flashcardSet}
          handleToggleUpdateSet={handleToggleUpdateSet}
          updateSet={handleUpdateSet}
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
      {openImport ? (
        <ImportFileDialog
          handleToggle={handleToggleImport}
          importing={importing}
          importFile={importFile}
        />
      ) : (
        <></>
      )}
    </LayoutNormal>
  );
};

export default SetEdit;
