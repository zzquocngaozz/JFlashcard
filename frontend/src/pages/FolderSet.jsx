import React, { createContext, useState } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Box,
  Button,
  Chip,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { SET_TYPE } from "../utils/constant";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import FormEditSetDiaolog from "../components/Dialog/FormEditSetDiaolog";
import KanjiCardEditContainer from "../components/KanjiCardEditContainer";
import GrammarCardEditConainer from "../components/GrammarCardEditConainer";
import VocaCardEditContainer from "../components/VocaCardEditContainer";
import useSetEdit from "../hooks/useSetEdit";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import useFolder from "../hooks/useFolder";
import { StackList } from "../components/Styled/StyledStack";
import FormFolderDialog from "../components/Dialog/FormFolderDialog";
import FolderSetHolder from "../components/FolderSetHolder";
import AddFolderSetDialog from "../components/Dialog/AddFolderSetDialog";


const FolderSet = () => {
  // hook
  // -------------- State area
  // const [flashcardSet, setFlashcardSet] = useState({
  //   flashcardSetId: 123,
  //   title: "Kanji chủ đề xe cộ",
  //   description: "Danh sách các từ kanji cấp độ N5",
  //   type: 2,
  //   private: false,
  // });
  // handle func
  // ------------------ Handle delete alert show and hide
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
    console.log('toggled')
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

  const [adding,setAdding] = useState(false);

  
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
              alignItems:"flex-end",
              margin: "20px 150px",
              p: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <Stack flex={3} sx={{ gap: 2 }}>
              <Typography variant="h5">{dataFolder?.title}</Typography>
              <Typography>{dataFolder?.description}</Typography>
              <StackList>
                <FilterNoneIcon/><Typography>{dataFolder?.numberSet} bộ flashcard</Typography>
              </StackList>
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
          <Stack sx={{ margin: "20px 150px" }}>
            <FolderSetHolder adding={adding} updateNumSet={updateNumSet}/>
          </Stack>
        </>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleAlertDelete}
          onDelete={deleteFolder}
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
          setAdding = {setAdding}
          handleToggle={handleToggleAdd}
        />
      ) : (
        <></>
      )}
      {mutationing ? <BackdropLoading></BackdropLoading> : <></>}
    </LayoutNormal>
  );
};

export default FolderSet;
