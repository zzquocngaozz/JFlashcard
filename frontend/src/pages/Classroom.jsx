import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Box,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ClassNav from "../components/Parts/ClassNav";
import { StackList } from "../components/Styled/StyledStack";
import SchoolIcon from "@mui/icons-material/School";
import ClassMoreAction from "../components/Menu/ClassMoreAction";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ClassRoomCodeDialog from "../components/Dialog/ClassRoomCodeDialog";
import useAuth from "../hooks/useAuth";
import InfoIcon from "@mui/icons-material/Info";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import PeopleIcon from "@mui/icons-material/People";
import ShowMoreText from "../components/DataDisplay/ShowMoreText";
import useClassroom from "../hooks/useClassroom";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import FormClassDialog from "../components/Dialog/FormClassDialog";
import DialogAlertDelete from "../components/Dialog/DialogAlertDelete";
import PostContainer from "../components/PostContainer";

export default function Classroom() {
  const { classRoomId } = useParams();
  const [expandCode, setExpandCode] = useState(false);
  const { currentUser } = useAuth();

  const handleTogleExpandCode = () => {
    setExpandCode(!expandCode);
  };

  const handleToggleAlertDelete = () => {
    setAlertDelete({
      ...alertDelete,
      open: !alertDelete.open,
    });
  };

  const handleToggleLeaveClass = () => {
    setAlertLeaveClass({
      ...alertLeaveClass,
      open: !alertLeaveClass.open,
    });
  };

  const handleToggleUpdate = () => {
    setOpenEditFrom(!openEditForm);
  };

  const [openEditForm, setOpenEditFrom] = useState(false);
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    message:
      "Thao tác này không thể hoàn lại. Bạn muốn tiếp tục xoá lớp học này không ?",
  });
  const [alertLeaveClass, setAlertLeaveClass] = useState({
    open: false,
    message:
      "Thao tác này không thể hoàn lại. Bạn muốn rời lớp học này không ?",
  });
  // const {
  //   classroom: clazz,
  //   loading,
  //   mutationing,
  //   deleteClassroom,
  //   updateClassroom,
  //   leaveClass,
  // } = useClassroom({ handleToggleUpdate });
  const {
    classroom: clazz,
    loading,
    mutationing,
    deleteClassroom,
    updateClassroom,
    leaveClass,
  } = useClassroom();
  const onUpdate = (data) => {
    updateClassroom(data, handleToggleUpdate);
  };
  useEffect(() => {
    document.title = "Lớp học";
  }, []);
  return (
    <LayoutNormal>
      <Stack p={3} pr={5} pl={5}>
        {loading ? (
          <BackdropLoading />
        ) : (
          <>
            <ClassNav />
            <StackList
              height={"100px"}
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
              className="container__theme"
            >
              <StackList>
                <SchoolIcon />
                <Typography variant="h5">{clazz.classRoomName}</Typography>
              </StackList>
              <ClassMoreAction
                handleToggleUpdate={handleToggleUpdate}
                handleToggleDelete={handleToggleAlertDelete}
                handleLeaveClass={() => {
                  handleToggleLeaveClass();
                }}
              />
            </StackList>
            <Stack flexDirection={"row"} pt={3} sx={{ columnGap: "30px" }}>
              <Stack flex={6}>
                <PostContainer />
              </Stack>
              <Stack flex={2} spacing={3}>
                {clazz.teacher.userId === currentUser.userId ? (
                  <Box className="container__theme" sx={{ height: "150px" }}>
                    <StackList sx={{ justifyContent: "space-between" }}>
                      <Typography>Mã tham gia</Typography>
                      <Tooltip title="Mở rộng">
                        <IconButton onClick={handleTogleExpandCode}>
                          <ZoomOutMapIcon />
                        </IconButton>
                      </Tooltip>
                    </StackList>
                    <Typography
                      variant="h3"
                      color={"primary"}
                      sx={{ pt: "15px" }}
                    >
                      {clazz.classRoomCode}
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
                <Box className="container__theme">
                  <StackList mb={2}>
                    <Typography variant="h6">Thông tin lớp học</Typography>
                    <InfoIcon color="primary" />
                  </StackList>
                  <StackList mb={1}>
                    <PeopleIcon />
                    <Typography>
                      {clazz.numberMember + " "} thành viên
                    </Typography>
                  </StackList>
                  <StackList mb={1}>
                    <FilterNoneIcon />
                    <Typography>
                      {clazz.numberSet + " "} bộ flashcard
                    </Typography>
                  </StackList>
                  {clazz?.description ? (
                    <>
                      <StackList mb={1}>
                        <InfoIcon />
                        <Typography>Về lớp học</Typography>
                      </StackList>
                      <ShowMoreText maxLength={70}>
                        {clazz?.description}
                      </ShowMoreText>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
      {expandCode ? (
        <ClassRoomCodeDialog
          handleTogleExpandCode={handleTogleExpandCode}
          code={clazz.classRoomCode}
        />
      ) : (
        <></>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleAlertDelete}
          onDelete={deleteClassroom}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alertLeaveClass.open ? (
        <DialogAlertDelete
          alertDelete={alertLeaveClass}
          handleToggleLeaveClass={handleToggleLeaveClass}
          onDelete={() => {
            leaveClass(currentUser?.userId, handleToggleLeaveClass);
          }}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openEditForm ? (
        <FormClassDialog
          classroom={clazz}
          handleToggle={handleToggleUpdate}
          // updateClass={updateClassroom}
          updateClass={onUpdate}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
    </LayoutNormal>
  );
}
