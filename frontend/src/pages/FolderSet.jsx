import React, { useEffect, useState } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import useFolder from "../hooks/useFolder";
import { StackList } from "../components/Styled/StyledStack";
import FormFolderDialog from "../components/Dialog/FormFolderDialog";
import FolderSetHolder from "../components/FolderSetHolder";
import AddFolderSetDialog from "../components/Dialog/AddFolderSetDialog";
import searhbanner from "../assets/images/searhbanner.png";
import { Link } from "react-router-dom";

const FolderSet = () => {
  const handleToggleAlertDelete = () => {
    setAlertDelete({
      ...alertDelete,
      open: !alertDelete.open,
    });
  };

  const handleToggleUpdate = () => {
    setOpenEditFrom(!openEditForm);
  };

  const handleToggleAdd = () => {
    setOpenAddSet(!openAddSet);
  };
  const [openEditForm, setOpenEditFrom] = useState(false);
  const [openAddSet, setOpenAddSet] = useState(false);
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    message:
      "Thao tác này không thể hoàn lại. Bạn muốn tiếp tục xoá thư mục này này không",
  });
  const {
    dataFolder,
    loading,
    mutationing,
    deleteFolder,
    updateFolder,
    updateNumSet,
  } = useFolder({ handleToggleUpdate });

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    document.title = "Xem thư mục";
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
              position: "relative",
              flexDirection: "row",
              alignItems: "flex-end",
              margin: "20px 150px",
              p: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <Stack flex={3} sx={{ gap: 2 }}>
              <Typography variant="h5">{dataFolder?.title}</Typography>
              <Typography>{dataFolder?.description}</Typography>
              <StackList>
                <FilterNoneIcon />
                <Typography>{dataFolder?.numberSet} bộ flashcard</Typography>
              </StackList>
            </Stack>
            <Stack flex={1.5} sx={{ justifyContent: "space-between" }}>
              <Box
                component={Link}
                to={"/my-lib/folders"}
                sx={{
                  top: "10px",
                  right: "30px",
                  display: "inline-block",
                  position: "absolute",
                }}
              >
                <Tooltip title={"Quay lại"}>
                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  mr: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip title={"Thêm bộ flashcard"}>
                  <IconButton onClick={handleToggleAdd}>
                    <AddIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Chỉnh sửa"}>
                  <IconButton onClick={handleToggleUpdate}>
                    <ModeEditIcon color="secondary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Xoá thư mục"}>
                  <IconButton onClick={handleToggleAlertDelete}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
          {dataFolder.numberSet === 0 ? (
            <Stack
              minHeight={150}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box width={70} height={70}>
                <img src={searhbanner} loading="lazy" alt="notfound" />
              </Box>
              <Typography textAlign={"center"}>
                Chưa có bộ flashcard nào trong thư mục này của bạn
              </Typography>
            </Stack>
          ) : (
            <Stack sx={{ margin: "20px 150px" }}>
              <FolderSetHolder adding={adding} updateNumSet={updateNumSet} />
            </Stack>
          )}
        </>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleAlertDelete}
          onDelete={deleteFolder}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openEditForm ? (
        <FormFolderDialog
          folder={dataFolder}
          handleToggle={handleToggleUpdate}
          updateFolder={updateFolder}
        />
      ) : (
        <></>
      )}
      {openAddSet ? (
        <AddFolderSetDialog
          setAdding={setAdding}
          handleToggle={handleToggleAdd}
          updateNumSet={updateNumSet}
        />
      ) : (
        <></>
      )}
      {mutationing ? <BackdropLoading /> : <></>}
    </LayoutNormal>
  );
};

export default FolderSet;
